
require('module-alias/register');
var coin_db = require('@lib/database/coin_db');
var chart_db = require('@lib/database/chart_db')
var coin_array = require('@init/coin_array');
var coin = ()=>{
    Promise.all(coin_array.map(o=>{
        coin_db.check_coin(o.id).then(a=>{
            if (a == false) {
                console.log('Insert ' + o.id + ' coin to Coin Database...');
                coin_db.create_coin(o.id).then(()=>{})
            }
        });
    }))
}
var chart = ()=>{
    Promise.all(coin_array.map(o => {
        Promise.all([
            chart_db.check_chart(o.id, 'market').then(a => {
                if (a==false){
                    console.log('Insert ' + o.id + ' chart to Market Chart Database...');
                    chart_db.create_chart(o.id, 'market').then(()=>{});
                }
            }),
            chart_db.check_chart(o.id, 'blockchain').then(a => {
                if (a==false){
                    console.log('Insert ' + o.id + ' chart to Blockchain Chart Database...');
                    chart_db.create_chart(o.id, 'blockchain').then(()=>{});
                }
            }),
            chart_db.check_chart(o.id, 'income').then(a => {
                if (a==false){
                    console.log('Insert ' + o.id + ' chart to Income Chart Database...');
                    chart_db.create_chart(o.id, 'income').then(()=>{});
                }
            })
        ])
    }))
}
module.exports = {
    coin: ()=>{
        setInterval(()=>{
            coin()
        }, 10000)
    },
    chart: ()=>{
        setInterval(()=>{
            chart();
        }, 10000)
    },
}