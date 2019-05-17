
var get_base = (id) => new Promise((res, rej) =>{
        res(require(`./coin/${id}.js`))
    })
module.exports = get_base;