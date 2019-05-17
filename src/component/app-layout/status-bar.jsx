import React from "react";
import './style.css';
var axios = require('axios');
export default class StatusBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
        setTimeout(()=>{
          this.getBTC();
          this.gettotalcoin();
        }, 500);
        setInterval(()=>{
          this.getBTC();
          this.gettotalcoin();
        }, 60000);
      }
      async getBTC(){
        var btcurl='https://api.coingecko.com/api/v3/coins/bitcoin';
        //var btcurl = 'https://api.coinbase.com/v2/exchange-rates?currency=BTC';//coinsbase
        let res = await axios.get(btcurl);
        let a = res.data.market_data;
        this.setState({
            marketdata: {
            btcprice: a.current_price.usd,
            change: a.price_change_percentage_24h,
          }
        })
      }
      async gettotalcoin(){
        var a = await axios.get('/api/totalcoin');
        this.setState({
          totalcoin: a.data.count
        })
      }
  render(){
    const {marketdata, totalcoin} = this.state;
    console.log(marketdata);
    console.log(totalcoin);
    return (
        <div>
          <p className='status'>
                {
                  totalcoin && <span>Cryptocurrency: {totalcoin} <i className="fas fa-circle"></i></span>
                }
                {
                  marketdata && <span>BTC: {marketdata.btcprice.toFixed(0)} <i className="fas fa-circle"></i></span> 
                }
          </p>
        </div>
    );
  }
}
