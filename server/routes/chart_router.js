require('module-alias/register');
var blockchain_chart = require('@models/chart/blockchain_chart');
var market_chart = require('@models/chart/market_chart');
var income_chart = require('@models/chart/income_chart');

module.exports = (router)=>{
    router.get('/coins/chart/:id', (req, res)=>{
        var id = req.params.id;
        var category = req.query.category;
        var from = parseInt(req.query.from);
        var to = parseInt(req.query.to);
        if (id==null){
            res.status(404).send('Specific given id')
        } else {
            switch (category) {
                case 'price':
                    market_chart.find({
                        id: id,
                        price: {$elemMatch: {$elemMatch: {$gte: from, $lte: to}} }
                    }, (err, data)=>{
                        res.status(200).json(data)
                    })
                break; 
                case 'blockchain':
                    blockchain_chart.find({
                        id: id,
                        total_mn: {$elemMatch: {$elemMatch: {$gte: from, $lte: to}} }
                    }, (err, data)=>{
                        res.status(200).json(data)
                    })
                break;
                case 'income':
                    income_chart.find({
                        id: id,
                        roi: {$elemMatch: {$elemMatch: {$gte: from, $lte: to}} }
                    }, (err, data)=>{
                        res.status(200).json(data)
                    })
                break;
            }
        }
    })
}
