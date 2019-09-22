import React from 'react';
import { observer } from 'mobx-react';
import GlobalStore from '../../stores/global.store';
import CardIndexStore from './cardIndex.store';
import './card.css'


export default class CardIndex extends React.Component {
    constructor(props) {
        super(props);
        this.Store = CardIndexStore;
    }

    render() {
        const { data } = this.Store;
        console.log(data)
        return (
            <div>
            {
                data && (
                    <div className='home-index'>{""}
                        <span className='home-index-title'><img className='index-img' src={`assets/img/coin/${data.id}.png`}/></span>
                        <span className='home-index-title'>{data.title}</span>
                        <div className={`home-index-price ${data.change > 0 ? 'index-green' : 'index-red'}`}>${data.price}</div>
                        <div className={`home-index-percent ${data.change > 0 ? 'index-bg-green' : 'index-bg-red'}`}>{data.change > 0 ? '+' : ''}{data.change}%</div>
                        <svg className="peity" height="50" width="220">
                            <polygon fill="#f9f9f9" points={`0 49.5 ${data.point} 220 49.5`} />
                            <polyline fill="none" stroke="#e6e6e6" stroke-width="1" stroke-linecap="square" points={data.point} />
                        </svg>
                    </div>
                )
            }
            </div>
        )
    }
}
