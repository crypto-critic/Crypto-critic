var x = (coin) => new Promise((res, rej) =>{
    var host = require(`@init/coin/${coin}`).host
    res ({
        getdifficulty: host + 'api/getdifficulty',
        getconnectioncount: host + 'api/getconnectioncount',
        getblockcount: host + 'api/getblockcount',
        getmasternodecount: host + 'api/getmasternodecount',
        getmoneysupply: host + 'ext/getmoneysupply',
        getdistribution: host + 'ext/getdistribution'
    })
})
module.exports = x;