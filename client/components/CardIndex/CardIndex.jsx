import React from 'react';
import './card.css'

var getCoordinates = (values, width, height ) => {
    var min = Math.min(...values);
    var max = Math.max(...values);
    var yRatio = ( max - min ) / height;
    var xRatio = width / ( values.length - 2 );

    return values.map( function( value, i ) {
        var y = height - ( ( value - min ) / yRatio );
        var x = ( xRatio * i ) - ( xRatio / 2 );
        return [x,y]
    })
}

const CardIndex = ({title, coinName, price, change, data}) => {
    return (
        <div className='home-index'>
            <div className='home-index-title'><img className='index-img' src={`assets/img/coin/${coinName}.png`}/>{title}</div>
            <div className={`home-index-price ${change > 0 ? 'index-green' : 'index-red'}`}>${price}</div>
            <div className={`home-index-percent ${change > 0 ? 'index-bg-green' : 'index-bg-red'}`}>{change > 0 ? '+' : '-'}{change}%</div>
            {/*<svg className="peity" height="50" width="220">*/}
            {/*    <polygon fill="#f9f9f9" points={getCoordinates(data ,220, 50).toString().split(",").join(' ')} />*/}
            {/*    <polyline fill="none" stroke="#e6e6e6" stroke-width="1" stroke-linecap="square" points={getCoordinates(data ,220, 50).toString().split(",").join(' ')} />*/}
            {/*</svg>*/}
        </div>
    )
};

export default CardIndex