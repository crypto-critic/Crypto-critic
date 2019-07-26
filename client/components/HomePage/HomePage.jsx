import React from 'react';
import {useState, useEffect} from 'react';
import CardIndex from '../CardIndex/CardIndex';
import './homepage.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AgTable from '../AgTable/AgTable';
// import "react-table/react-table.css";
// import {RankingTable} from "../RankingTable/RankingTable";

// const getTableData = async (vs_currency)=>{
//     let data = await axios.get(`api/coins/markets?vs_currency=${vs_currency}&category=masternode`);
//     return data.data;
// };

const HomePage = () => {
    // const [tableData, setTableData] = useState([]);
    const money = useSelector(state => state.money.money);
    // const locale = useSelector(state => state.locale.locale);
    // useEffect(async  ()=>{
    //      let res = await getTableData(money.toLowerCase());
    //      setTableData(res)
    // }, []);
    console.log('home page' , money);
    return (
        <div className='home-quotation'>
            <div className="home-tickers-index clear">
                <CardIndex
                    title = {'Top Marketcap'}
                    id = {'ethereum'}
                    vs_currency={money}
                />
                <CardIndex
                    title = {'Top Marketcap'}
                    id = {'dash'}
                    vs_currency={money}
                />
                <CardIndex
                    title = {'Top Marketcap'}
                    id = {'ethereum'}
                    vs_currency={money}
                />
                <CardIndex
                    title = {'Top Marketcap'}
                    id = {'bitcoin'}
                    vs_currency={money}
                />
                <CardIndex
                    title = {'Top Marketcap'}
                    id = {'dash'}
                    vs_currency={money}
                />
            </div>
            <div className='home-table title-center'><h1>Top 100 Cryptocurrencies</h1></div>
            <div className="home-table">
                <AgTable money={money}/>
                {/* <RankingTable
                    data={tableData}
                /> */}
            </div>
        </div>
    );
};

export default HomePage;