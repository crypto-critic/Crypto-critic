import React from 'react';
import {useState, useEffect} from 'react'
import './card.css'
var axios = require('axios');
import { useSelector } from 'react-redux'

const getData = async (id, vs_currency) => {
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d`;
    var res = await axios.get(url);
    var point = await getCoordinates(res.data[0].sparkline_in_7d.price, 320, 70);
    return Object.assign({
        id: id,
        price: res.data[0].current_price,
        change: res.data[0].price_change_percentage_24h.toFixed(2),
    }, point);
};

const getCoordinates = async (values, width, height) => {
    var min = Math.min(...values);
    var max = Math.max(...values);
    var yRatio = ( max - min ) / height;
    var xRatio = width / ( values.length - 2 );
    var result = values.map(function( value, i ) {
        var y = height - ( ( value - min ) / yRatio );
        var x = ( xRatio * i ) - ( xRatio / 2 );
        return [x,y]
    });
    return await {point: result.toString().split(",").join(' ')};
};

const CardIndex = ({title, id, vs_currency}) => {
    const [data, setData] = useState({});
    useEffect(async ()=>{
        var result = await getData(id, vs_currency);
        setData(result);
    },['bitcoin', 'USD']);
    return (
        <div className='home-index'>
            <span className='home-index-title'><img className='index-img' src={`assets/img/coin/${data.id}.png`}/></span>
            <span className='home-index-title'>{title}</span>
            <div className={`home-index-price ${data.change > 0 ? 'index-green' : 'index-red'}`}>${data.price}</div>
            <div className={`home-index-percent ${data.change > 0 ? 'index-bg-green' : 'index-bg-red'}`}>{data.change > 0 ? '+' : ''}{data.change}%</div>
            <svg className="peity" height="50" width="220">
                <polygon fill="#f9f9f9" points={`0 49.5 ${data.point} 220 49.5`} />
                <polyline fill="none" stroke="#e6e6e6" stroke-width="1" stroke-linecap="square" points={data.point} />
            </svg>
        </div>
    )
};

export default CardIndex