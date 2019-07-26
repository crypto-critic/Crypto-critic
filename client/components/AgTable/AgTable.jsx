import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './AgTable.scss';
import { AgGridReact } from 'ag-grid-react';
import ChangeRenderer from './ChangeRenderer';
import CoinRenderer from './CoinRenderer';
import HeaderRenderer from './HeaderRenderer';
import FilterRederer from './FilterRenderer';
import axios from 'axios';
// import moneyActions from '../../actions/money.actions';
// import moneyConstants from '../../constants/money.constants';

const columnDefs= [
    {
        headerName: 'Logo',
        field: 'image',
        sortable: true,
        editable: true,
        filter: true,
        hide: true,
    },
    {
        headerName: 'Coins',
        field: 'name',
        sortable: true,
        editable: true,
        filter: true,
        cellRenderer: 'CoinRenderer',
        checkboxSelection: true,
        // headerComponent: 'HeaderRenderer'
    },
    {
        headerName: 'Price',
        field: 'current_price',
        sortable: true,
        editable: true,
        filter: true,
        // valueFormatter: (params) => {
        //     return (params.data.current_price.toFixed(2));
        // },
        cellRenderer: (params) => {
            return ('$'+params.value.toFixed(2));
        }
    },
    {
        headerName: 'Change',
        field: 'price_change_percentage_24h',
        sortable: true,
        editable: true,
        filter: 'FilterRenderer',
        cellRenderer: 'ChangeRenderer',
        menuTabs: ["filterMenuTab"]
    },
    {
        headerName: 'Volume',
        field: 'total_volume',
        sortable: true,
        editable: true,
        filter: true,
        cellRenderer: (params) => {
            return ('$'+params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        }

    },
    {
        headerName: 'Market Cap',
        field: 'market_cap',
        sortable: true,
        editable: true,
        filter: true,
        valueFormatter: (params) => {
            return ('$'+params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        }
    },
    {
        headerName: 'Supply',
        field: 'circulating_supply',
        sortable: true,
        editable: true,
        filter: true,
        valueFormatter: (params) => {
            return ('$'+params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        }
    },
]

const getRowStyle = (params) => {
    params.node.rowIndex % 2 === 0 ? { background: 'red'} : { background: 'white' }
}

const frameworkComponents = {
    ChangeRenderer: ChangeRenderer,
    CoinRenderer: CoinRenderer,
    HeaderRenderer: HeaderRenderer,
    FilterRederer: FilterRederer
}

const getTableData = async (vs_currency)=>{
    let result = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
    return result.data;
};

const AgTable = (props) => {
    // console.log(props)
    const [rowData, setRowData] = useState([]);
    // const money = useSelector(state => state.money.money);
    const {money} = props;

    console.log('money', money)
    useEffect( async() => {
        getTableData(money.toLowerCase()).then(data=>{
            setRowData(data)
        })
    },[])
    const dispatch = useDispatch();
    const onButtonClick = e => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map( node => node.data );
        const selectedDataStringPresentation = selectedData.map( node => node.name + ' : ' + node.current_price).join(', ');
        alert(`Selected coins: ${selectedDataStringPresentation}`);
    }
    const onChange = (e) => {
        let x = e.target.value;
        dispatch({ type: 'CHANGE_MONEY', money: x});
    }
    return (
        <div 
        className="ag-theme-material"
        style={{ 
        height: '768px', 
        width: '1025',
        margin: 'auto' }} 
      >
      <button type='button' id='mySelect' onClick={onButtonClick}>Get selected rows</button>
      {/* <select onChange={onChange}>
        <option value="btc">BTC</option>
        <option value="vnd">VND</option>
        <option value="jpy">JPY</option>
        <option value="eur">EUR</option>
    </select>  */}
        <AgGridReact
          onGridReady={ params => this.gridApi = params.api }
          columnDefs={columnDefs}
          rowData={rowData}
          frameworkComponents={frameworkComponents}
          paginationPageSize={20}
          pagination={true}
          rowSelection={'multiple'}
          getRowStyle={getRowStyle}
        //   rowStyle={{background: '#f0f0f0'}}
        >
        </AgGridReact>
      </div>
    )
}
export default AgTable;