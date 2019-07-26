import React, { Component } from 'react';
// import logo from './logo.svg';
import './AgTable.scss';
import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import axios from 'axios';

const getTableData = async (vs_currency)=>{
    let result = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
    return result.data;
};

class AgTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
        columnDefs: [
            {
                headerName: 'Coins',
                field: 'name',
                sortable: true,
                editable: true,
                filter: true,
        
            },
            {
                headerName: 'Price',
                field: 'current_price',
                sortable: true,
                editable: true,
                filter: true,
        
            },
            {
                headerName: 'Change',
                field: 'price_change_percentage_24h',
                sortable: true,
                editable: true,
                filter: true,
        
            },
            {
                headerName: 'Volume',
                field: 'total_volume',
                sortable: true,
                editable: true,
                filter: true,
        
            },
            {
                headerName: 'Market Cap',
                field: 'market_cap',
                sortable: true,
                editable: true,
                filter: true,
        
            },
            {
                headerName: 'Supply',
                field: 'circulating_supply',
                sortable: true,
                editable: true,
                filter: true,
        
            },
        ],
        rowData: []
    }
  }
  componentDidMount() {
        getTableData('usd').then(data => {
            console.log(data)
            this.setState({rowData: data})
        })
    }
    
  render() {
    return (
      <div 
        className="ag-theme-material"
        style={{ 
        height: '768px', 
        width: '1025',
        margin: 'auto' }} 
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          paginationAutoPageSize={true}
          pagination={true}
          >
        </AgGridReact>
      </div>
    );
  }
}

export default AgTable;