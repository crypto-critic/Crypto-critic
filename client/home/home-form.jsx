import React from "react";
import ReactTable from "react-table/lib";
import 'react-table/react-table.css';
import { Link, Route } from "react-router-dom";
import axios from 'axios';
import loadData from './loadData2';
import {AppLayout} from '../components/AppLayout/app-layout';
import './table-style.css';
const chooseCoin = (base, x) => {
  return (
    base == `BTC` ? `${x}.BTC`
  : base == `USD` ? `${x}.USD`
  : base == `AUD` ? `${x}.AUD`
  : base == `BGN` ? `${x}.BGN`
  : base == `BRL` ? `${x}.BRL`
  : base == `CAD` ? `${x}.CAD`
  : base == `CHF` ? `${x}.CHF`
  : base == `CNY` ? `${x}.CNY`
  : base == `CZK` ? `${x}.CZK`
  : base == `EUR` ? `${x}.EUR`
  : base == `JPY` ? `${x}.JPY`
  : base == `KRW` ? `${x}.KRW`
  : base == `VND` ? `${x}.VND`
  : base == `RUB` ? `${x}.RUB`
  : `${x}.USD`
  )
}
const pre = (base) =>{
  return (
    base == 'BTC' ? <i class="fab fa-btc"></i>
    : base == 'USD' ? '$'
    : base == 'AUD' ? ' '
    : base == 'BGN' ? ' '
    : base == 'BRL' ? ' '
    : base == 'CAD' ? ' '
    : base == 'CHF' ? ' '
    : base == 'CNY' ? ' '
    : base == 'CZK' ? ' '
    : base == 'EUR' ? ' '
    : base == 'JPY' ? ' '
    : base == 'KRW' ? ' '
    : base == 'VND' ? ' '
    : base == 'RUB' ? ' '
    : '$'
  )
}
const suf = (base) => {
  return (
    base == 'BTC' ? ''
    : base == 'USD' ? ''
    : base == 'AUD' ? ' AUD'
    : base == 'BGN' ? ' BGN'
    : base == 'BRL' ? ' BRL'
    : base == 'CAD' ? ' CAD'
    : base == 'CHF' ? ' CHF'
    : base == 'CNY' ? ' CNY'
    : base == 'CZK' ? ' CZK'
    : base == 'EUR' ? ' EUR'
    : base == 'JPY' ? ' JPY'
    : base == 'KRW' ? ' KRW'
    : base == 'VND' ? ' VND'
    : base == 'RUB' ? ' RUB'
    : ''
  )
}
const HomeForm = ({data, base}) => (
  <Grid width={16} columns={1}>
    <Grid.Row>
            <Grid.Column>
              <ReactTable
                  data={data}
                  resizable={false}
                  onFetchData={this.loadData}
                  columns={[
                    {
                      Header: "#",
                      accessor: "id",
                      maxWidth: 40,
                      filterable: false,
                      sortable: false,
                      Cell: row => (
                        <div>
                          <Link to={{
                            pathname: `/coins/${row.value.id}`,
                            state: {
                              id: row.value.id
                            }
                          }}>
                          <img width="20" height="20" src={`/public/img/coin/${row.value.toLowerCase()}.png`}/></Link>
                        </div>
                      )
                    },
                    {
                      headerClassName: 'left',
                      className: 'left',
                      Header: "Coin",
                      accessor: "",
                      Cell: row => (
                        <span>
                          <span style={{
                            textAlign: "left !important",
                            color: '#770278',
                            transition: 'all .3s ease',
                            fontWeight: "bold"
                          }}>
                          <Link to={{
                            pathname: `/coins/${row.value.id}`,
                            state: {
                              id: row.value.id
                            }
                          }}>
                          {row.value.name} ({row.value.id})
                          </Link>
                          </span>
                        </span>
                      )
                    },
                    {
                      headerClassName: 'right',
                      className: 'right',
                      Header: "Price",
                      accessor: chooseCoin(base, 'price'),
                      Cell: row => (
                        <span>
                          <span style={{
                            fontWeight: 400,
                            transition: 'all .3s ease',
                          }}>
                          {pre(base)}
                            {base == 'BTC'? row.value.toFixed(8) : row.value.toFixed(4)} 
                          {suf(base)}
                          </span>
                        </span>
                      )
                    },
                    {
                      headerClassName: 'right',
                      className: 'right',
                      Header: "Change",
                      accessor: 'change',
                      Cell: row => (
                        <span>
                          <span style={{
                            fontWeight: 400,
                            color: row.value > 0 ? '#1e7313'
                              : row.value < 0 ? '#fc021a'
                              : '#010469',
                            transition: 'all .3s ease'
                          }}>
                            {row.value>0? '+' : ''}{row.value.toFixed(2)}%
                          </span>
                        </span>
                      )
                    },
                    {
                      headerClassName: 'right',
                      className: 'right',
                      Header: "Volume",
                      accessor: chooseCoin(base, 'volume'),
                      Cell: row => (
                        <span>
                          <span style={{
                            fontWeight: 400,
                            transition: 'all .3s ease',
                          }}>
                            {pre(base)}
                      {base == 'BTC'? row.value.toFixed(4) : row.value.toFixed(4)} 
                            {suf(base)}
                          </span>
                        </span>
                      )
                    },
                    {
                      headerClassName: 'right',
                      className: 'right',
                      Header: "Market Cap",
                      accessor: chooseCoin(base, 'marketcap'),
                              Cell: row => (
                                <span>
                                  <span style={{
                                    fontWeight: 400,
                                    transition: 'all .3s ease',
                                  }}>
                                    {pre(base)}
                            {base == 'BTC'? row.value.toFixed(4) : row.value.toFixed(4)} 
                            {suf(base)}
                                  </span>
                                </span>
                              )
                    },
                    {
                      headerClassName: 'right',
                      className: 'right',
                      Header: "ROI",
                      accessor: 'roi',
                      Cell: row => (
                        <span>
                          <span style={{
                            color: '#022b6d',
                            fontWeight: "bold",
                            transition: 'all .3s ease',
                          }}>
                            {row.value.toFixed(0)}%
                          </span>
                        </span>
                      )
                    },
                    {
                      headerClassName: 'right',
                      className: 'right',
                      id: "mncount",
                      Header: "Nodes",
                      accessor: 'mncount',
                      Cell: row => (
                        <span>
                          <span style={{
                            fontWeight: 400,
                            transition: 'all .3s ease',
                          }}>
                            {row.value}
                          </span>
                        </span>
                      )
                    },
                    {
                      headerClassName: 'right',
                      className: 'right',
                      //headerStyle: {"text-align" : "none"}, 
                      Header: "Votes",
                      //minWidth: '100',
                      accessor: '',
                      Cell: row => (
                        <div data-content="Vote by heart">
                        <Popup trigger={
                          <Button active basic color={row.value.votestate == true ? 'black' :'instagram' }
                          onClick={()=> this.handleOnclick && this.handleOnclick(row.value.id)}
                          >
                            <i className="fas fa-heart liked"></i>{"   "}{row.value.totalvote}
                          </Button>
                        }
                          content="Please vote by heart!"
                        />
                        
                        </div>
                      )
                    },
                    {
                      Header: "Votes",                      
                      accessor: 'change',
                      show: false
                    },
                    
                  ]}
                  defaultSorted={[
                    {
                      id: 'totalvote',
                      desc: true
                    }
                  ]}
                  defaultPageSize={20}
                  showPaginationTop={false}
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
            </Grid.Column>
          </Grid.Row>
</Grid>);
export default HomeForm;
