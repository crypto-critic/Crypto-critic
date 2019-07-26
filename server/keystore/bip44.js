const bip39 = require('bip39');
const hdkey = require('hdkey');
const createHash = require('create-hash');
const btcLib = require('bitcoinjs-lib');
const bs58check = require('bs58check');
const wif = require('wif');
const mnemonic = "pinokara long dungrau huy sand domain believe dawn december regret cube fox";

let getChildKey = async (coin, index)=>{
    const coininfo = await require('./listCoinDirrive')[coin];
    const seed = await bip39.mnemonicToSeed(mnemonic); //creates seed buffer
    console.log('seed', seed)
    const root = hdkey.fromMasterSeed(seed, coininfo.version);
    console.log('root', root);
    const masterPublicKey = root.publicKey.toString('hex');
    const masterPrivateKey = root.privateKey.toString('hex');
    const addrnode = root.derive(`m/44'/${coininfo.coinType}'/0'/0/${index}`);
    const pub = await addrnode._publicKey;
    const priv = await addrnode._privateKey;
    const step2 = createHash('sha256').update(pub).digest();
    const step3 = createHash('rmd160').update(step2).digest();
    const step4 = Buffer.allocUnsafe(21);
    step4.writeUInt8(coininfo.base58PubPrefix, 0);
    step3.copy(step4, 1); //step4 now holds the extended RIPMD-160 result
    const step9 = bs58check.encode(step4);
    const importPrivKey = wif.encode(coininfo.base58PrivPrefix, priv, true);
    return await {
        wif: importPrivKey,
        p2pkh: step9
    }
};

// getChildKey('bitcoin', 1).then(data => {
//     const keyPair = btcLib.ECPair.fromWIF(data.wif);
//     const { address } = btcLib.payments.p2pkh({ pubkey: keyPair.publicKey });
//     console.log(data.p2pkh);
//     console.log(address);
// })
module.exports = getChildKey;