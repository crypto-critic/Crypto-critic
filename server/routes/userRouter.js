require('babel-polyfill')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../services/register.validation');
const validateLoginInput = require('../services/login.validation');
const mongoose = require('mongoose');
const User = require(`../models/User`);
const Vote = require(`../models/Vote`);
const List = require('../models/ListCoin');
const Transaction = require(`../models/Transaction`);
const getChildKey = require('../keystore/bip44');
const {
    apiPrefix,
    authorizationKey,
    login,
    register,
    userInfo,
    userWalletManagement
} = require('../endpoints');

module.exports = (router)=>{
    router.post(register.path, async (req, res) => {
        const { password, firstName, lastName, email, role } = req.body;
        const { errors, isValid } = validateRegisterInput(req.body);
        if(!isValid) {
            return res.status(400).json(errors);
        }
        let count = await User.count();
        User.findOne({ email})
            .then(user => {
            if(user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Email already exists'
                });
            }
            else {
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) console.error('There was an error', err);
                    else {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if(err) console.error('There was an error', err);
                            else {
                                const newUser = new User({
                                    _id: new mongoose.Types.ObjectId,
                                    firstName,
                                    lastName,
                                    email,
                                    password: hash,
                                    role: role || 'user',
                                    walletIndex: count + 1
                                });
                                newUser
                                    .save()
                                    .then(user => {
                                        res.json(user)
                                    });
                            }
                        });
                    }
                });
            }
        });
    });

    router.post(login.path, (req, res) => {
        const { errors, isValid } = validateLoginInput(req.body);
        if(!isValid) {
            return res.status(400).json(errors);
        }
        const { email, password } = req.body;
        User.findOne({ email })
            .then(user => {
                if(!user) {
                    return res.status(404).json({status: 'error', message: 'User not found!'});
                }
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                _id: user._id,
                                email: user.email,
                                name: user.name,
                                role: user.role,
                                index: user.index
                            };
                            jwt.sign(payload, 'pinokarahere', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        status: 'success',
                                        token: `${token}`
                                    });
                                }
                            });
                        }
                        else {
                            return res.status(400).json({status: 'error', message: 'Incorrect password!'});
                        }
                    });
            });
    });

    router.get(userInfo.path, passport.authenticate('jwt', { session: false }), async (req, res) => {
        return res.status(200).json(req.user);
    });

    router.get(userWalletManagement.createWalletPath, passport.authenticate('jwt', { session: false }), async (req, res) => {
        let { coinId } = req.query;
        let { email, walletIndex } = req.user;
        let address = await getChildKey(coinId, walletIndex);
        let { p2pkh, wif } = address;
        let currentWallet = await User.findOne({email, 'wallet.coinId': coinId});
        if (currentWallet === null){
            await User.update(
                {email},
                {$push: {wallet : {
                    coinId,
                    address: p2pkh,
                    balance: 0
                }}}
            )
            res.status(200).json({ status: 'success', p2pkh, wif });
        } else {
            res.status(400).json({ status: 'error', message: `One user have just one ${coinId} wallet!` });
        }
    });

    router.get(userWalletManagement.deleteWalletPath, passport.authenticate('jwt', { session: false }), async (req, res) => {
        let { coinId, email } = req.query;
        let currentWallet = await User.findOne({email, 'wallet.coinId': coinId});
        let currentBalance = currentWallet.balance || 0;
        if (currentWallet !== null && currentBalance === 0){
            await User.update(
                {email},
                {$pull: {wallet : { coinId }}}
            )
            res.status(200).json({status: 'success', message: `Deleted ${coinId} wallet!`});
        } else {
            res.status(400).json({status: 'error', message: `${coinId} wallet do not exits!`});
        }
    });

    router.get('/users/vote', passport.authenticate('jwt', { session: false }), async (req, res) => {
        let { coinId, email } = req.query;
        let data = await Vote.findOne({ email, coinId});
        if (data === null) {
            await Vote.create({ email , coinId, vote: true });
            res.status(200).json({status: 'success', message: `Voted for ${coinId}`})
        } else {
            await Vote.update(
                { email, coinId},
                { $set: { vote: !data.vote}}
            );
            res.status(200).json({status: 'success', message: data.vote ? `Unvoted for ${coinId}` : `Voted for ${coinId}`});
        }
    });

    router.post('/users/wallet/transfer', passport.authenticate('jwt', { session: false }), async (req, res) => {
        let { email } = req.user;
        let { coinId, toUserEmail, timeOut } = req.body;
        let amount = parseInt(req.body.amount);
        let currentUser = await User.findOne({email, 'wallet.coinId': coinId});
        let activeBalance = currentUser.wallet[0].active || 0;
        // console.log(activeBalance)
        // First: chect amount avaiable
        if (amount > activeBalance) {
            res.status(400).json({status: 'error', message: 'Not enough balance!'});
        }
        let toUser = await User.findOne({email: toUserEmail});
        if (toUser === null) {
            res.status(400).json({status: 'error', message: 'User receive your coin not exits'});
        }
        await User.update(
            {email, 'wallet.coinId': coinId},
            {$inc: {
                'wallet.$.active': -amount,
                'wallet.$.lock': amount
            }}
        )
    });

    router.post('/admin/insert_coin', passport.authenticate('jwt', { session: false }), async (req, res) => {
        let { role } = req.user;
        if (role === 'admin') {
            var check = await List.findOne({coinId: req.body.coinId});
            if (check === null){
                let newCoin = new List({
                    coinId: req.body.coinId,
                    host: req.body.host,
                    vpsIndex: req.body.active || true,
                    category: req.body.category
                });
                await newCoin.save();
                res.status(200).json({status: 'success', message: `Save ${req.body.name} to Database!`});
            } else {
                res.status(401).json({status: 'error', message: `${req.body.name} already exist!`});
            }
        }
    });

    router.post('/admin/add_balance', passport.authenticate('jwt', { session: false }), async (req, res) => {
        let { role } = req.user;
        if (role === 'admin') {
            let { coinId, amount: a, toUserEmail } = req.body;
            let amount = parseInt(a);
            let currentWallet = await User.findOne({email: toUserEmail, 'wallet.coinId': coinId});
            await User.update(
                {email, 'wallet.coinId': coinId},
                {$inc: { 'wallet.$.balance': amount, 'wallet.$.active': amount}}
            )
            res.status(200).json({status: 'success', message: `Add ${amount} ${coinId} to ${toUserEmail}`});
        }
    });

    router.post('/admin/change_coin_status', passport.authenticate('jwt', { session: false }), async (req, res) => {
        let { role } = req.user;
        let { coinId } = req.body;
        if (role === 'admin') {
            let currentStatus = await List.findOne({ coinId });
            await List.update({ coinId }, {$set: {active: !currentStatus.active}});
            res.status(200).json({status: 'success', message: `${coinId}${currentStatus.active === true ? ' deactive' : ' active'}`});
        }
    });
};

