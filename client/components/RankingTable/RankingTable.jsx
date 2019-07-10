import React from 'react';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import './rankingtable.css'
// const data = [{
//     id: 'bitcoin',
//     current_price: 20000,
//     price_change_percentage_24h: 5,
// }];
const columns = [
    {
        Header: '',
        width: 50,
        headerClassName: 'header left',
        Cell: <i className="far fa-star"></i>,
        className: 'cell left'
    },
    {
        Header: 'Coin',
        headerClassName: 'header left',
        id: 'coin',
        width: 200,
        accessor: data => ({id: data.id, name: data.name}),
        Cell: (data) => <div style={{margin: 2px, auto;}}><img className='img' src={`assets/img/coin/${data.value.id}.png`}/>{data.value.name}</div>,
        className: 'cell left'
    },
    {
        Header: 'Price',
        headerClassName: 'header right',
        width: 200,
        accessor: 'current_price',
        Cell: (price) => <div><p>{price.value}</p></div>,
        className: 'cell right'
    },
    {
        Header: 'Change',
        headerClassName: 'header right',
        width: 200,
        accessor: 'price_change_percentage_24h',
        Cell: (change) => <p className={`change ${change.value > 0 ? 'index-bg-green' : 'index-bg-red'}`}>{change.value}</p>,
        className: 'cell right'
    }
];

export const RankingTable = ({data})=> {
    return (
        <ReactTable
            className='table'
            showPageSizeOptions={false}
            columns={columns}
            data={data}
        />
    )
};