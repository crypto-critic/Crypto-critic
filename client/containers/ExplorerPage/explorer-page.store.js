import React from 'react';
import { observable, action, computed, observe } from 'mobx';
import { Input, Button, Icon, Avatar, Tag } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { GlobalStore } from '../../stores';
import { getLast100Txs, getInfo } from '../../services/explorer.service';
import { formatCurrency } from '../../services/formatCurrency.service';
import { coin } from '../../endpoints';

class ExplorerPageStore {
    constructor(opts = {}) {
        this.coinId = opts.coinId;
        this.getLast100Txs = getLast100Txs;
        this.getInfo = getInfo;
        this.initData();
    }

    @observable children = 'txsList';

    @observable coinInfo;
    
    @observable explorerDataTable;

    @observable explorerTableLoading = false;

    @computed get money() {
        return GlobalStore.money
    }

    @action
    initData = () => {
        this.setProperties({ explorerTableLoading: true });
        Promise.all([
            this.getInfo(this.coinId),
            this.getLast100Txs()
        ]).then(([coinInfo, explorerDataTable]) => {
        // console.log('coinInfo: ', coinInfo);
        // console.log('explorerDataTable: ', explorerDataTable);
            this.setProperties({
                coinInfo,
                explorerDataTable,
                explorerTableLoading: false
            })
        })
        // this.getInfo(this.coinId).then((result) => {
        //     this.coinInfo = result;
        // })
        // this.getLast100Txs().then((result) => {
        //     this.explorerDataTable = result;
        //     this.setProperties({ explorerTableLoading: false })
        // })
    }

    @computed get explorerColumns() {
        return (
            [
                {
                    title: 'Block Height',
                    dataIndex: 'blockindex',
                    key: 'blockindex',
                },
                {
                    title: 'Amount',
                    dataIndex: 'total',
                    key: 'total',
                    render: (data) => (
                        <div>{formatCurrency(data, 'btc')}</div>
                    ),
                },
                {
                    title: 'Hash',
                    dataIndex: 'blockhash',
                    key: 'blockhash',
                    render: (data) => (
                        <Link to={`/explorer/${this.coinId}/getblock?hash=${data}`}>{data}</Link>
                    ),
                },
                {
                    title: 'Time Stamp',
                    dataIndex: 'timestamp',
                    key: 'timestamp',
                    render: (data) => (
                        <div>{moment(data).format("YYYY/DD/MM HH:mm:ss")}</div>
                    ),
                },
            ]
        )
    }

    @action setProperties = (newValue) => {
        Object.assign(this, newValue);
    }
    
}

export default ExplorerPageStore;