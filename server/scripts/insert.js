var mongoose = require('mongoose');
var dbString = 'mongodb://localhost:27017/myapp';
mongoose.connect(dbString, { useNewUrlParser: true });
var mongoose = require('mongoose');
var coin_db = require('../library/database/coin_db');
var chart_db = require('../library/database/chart_db')
var coin_array = require('../initial/coin_array');
var coin = ()=>{
    Promise.all(coin_array.map(o=>{
        coin_db.check_coin(o.id).then(a=>{
            if (a == false) {
                console.log('Insert ' + o.id + ' coin to Coin Database...');
                coin_db.create_coin(o.id).then(()=>{})
            }
        });
    }))
};
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
};
coin();
chart();