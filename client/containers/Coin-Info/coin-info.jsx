import React from 'react';
import './coin-info.less'
import {formatter} from "../../commons/convert-crypto";
export class CoinInfo  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let coin={
            id:'btc',
            name :'Bit Coin',
            market_data:{
                current_price:{
                    usd:10000
                }
            }
        }
        return(
            <div className='coin-info'>
                <div className='coin-main flex-row'>
                    <div className='coin-left flex-column'>
                        <div className='left-info'>
                            <span className='rank'># Rank 1</span>
                            <div className='image-wrap'>
                                <img width='180px' height='180px' src={`/coins/${coin.id}.png`}
                                     alt={coin.name}/>
                            </div>
                            <h2 className='price text-center'>
                                {formatter.format(coin.market_data.current_price.usd)}
                            </h2>
                            <div className='name text-center'>
                                {coin.name}
                            </div>
                            <div
                                className='summary'
                            >
                                <h5>Overview:</h5>

                                {/*<div className='flex-column'>*/}
                                {/*    {*/}
                                {/*        sparkline && overview.map((o, i) => (*/}
                                {/*            <div key={i} className='ov-row'>*/}
                                {/*                <div className='on-left'>*/}
                                {/*                    {o.left()}*/}
                                {/*                </div>*/}
                                {/*                <div className='on-right'>*/}
                                {/*                    {o.right({sparkline, name: coin.name})}*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        ))*/}
                                {/*    }*/}
                                {/*</div>*/}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}