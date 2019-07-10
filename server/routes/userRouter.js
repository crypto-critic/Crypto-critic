const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const mongoose = require('mongoose');
const User = require(`../models/user`);
const Vote = require(`../models/vote`);
const Transaction = require(`../models/transaction`);

module.exports = (router)=>{
    router.post('/users/register', async (req, res) => {
        const { errors, isValid } = validateRegisterInput(req.body);
        if(!isValid) {
            return res.status(400).json(errors);
        }
        let count = await User.count();
        console.log(count)
        User.findOne({
            email: req.body.email
        }).then(user => {
            if(user) {
                return res.status(400).json({
                    email: 'Email already exists'
                });
            }
            else {

                bcrypt.genSalt(10, (err, salt) => {
                    if(err) console.error('There was an error', err);
                    else {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if(err) console.error('There was an error', err);
                            else {
                                const newUser = new User({
                                    _id: new mongoose.Types.ObjectId,
                                    name: req.body.name,
                                    email: req.body.email,
                                    password: hash,
                                    role: 0,
                                    index: count + 1
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

    router.post('/users/login', (req, res) => {
        const { errors, isValid } = validateLoginInput(req.body);
        if(!isValid) {
            return res.status(400).json(errors);
        }
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({email})
            .then(user => {
                if(!user) {
                    errors.email = 'User not found';
                    return res.status(404).json(errors);
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
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
            });
    });

    router.get('/users/info', passport.authenticate('jwt', { session: false }), async (req, res) => {
        let _id = req.user._id;
        let sentTransaction = await Transaction.find({from: _id});
        let receiveTransaction = await Transaction.find({to: _id});
        res.json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            index: req.user.index,
            role: req.user.role,
            transaction: {
                sentTransaction: sentTransaction,
                receiveTransaction: receiveTransaction
            },
            balance: 0
        });
    });

    router.get('/users/voteFor', passport.authenticate('jwt', { session: false }), async (req, res) => {
        let data = await Vote.findOne({ userId: req.user._id, coinId: req.query.coinId});
        if (data == null) {
            let newVote = new Vote({ userId: req.user._id, coinId: req.params.coinId, vote: true });
            newVote.save();
        } else {
            Vote.update(
                { userId: req.user._id, coinId: req.params.coinId},
                { $set: { vote: !data.vote}}
            )
        }
    })

    router.post('/users/transfer', passport.authenticate('jwt', { session: false }), async (req, res) => {
        let coinId = req.body.coinId;
        let toUserId = req.body.toUserId;
        let amount = req.body.amount;
        let wallet = req.user.wallet.filter(wallet => wallet.coinId === coinId);
        // First: chect amount avaiable
        if (amount < wallet.amount) {
            res.status(400).json({status: 'false', message: 'Not enough balance!'});
        } else {
            User.update(
                {_id: req.user._id},
                { $inc: {}}
            )
        }

    })
};

