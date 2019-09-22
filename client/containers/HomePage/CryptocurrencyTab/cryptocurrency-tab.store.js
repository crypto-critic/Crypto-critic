import React from 'react';
import { observable, action, computed, observe } from 'mobx';
import { Input, Button, Icon, Avatar, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { GlobalStore } from '../../../stores';
import { getCryptocurrencyData } from '../../../services/homePage.service';
import { formatCurrency } from '../../../services/formatCurrency.service';

class CryptocurrencyTabStore {
    constructor() {
        this.getCryptocurrencyData = getCryptocurrencyData;
        this.initData(this.query);
        observe(this, 'query', ({ newValue }) => {
        console.log('newValue: ', newValue);
            this.initData(newValue);
        })
    }

    @observable cryptocurrencyDataTable;

    @observable searchInput;

    @observable searchText;

    @observable cryptocurrencyTableLoading = false;

    @observable sortOrder;

    @computed get money() {
        return GlobalStore.money
    }

    @computed get query() {
        return {
            money: GlobalStore.money,
            order: this.sortOrder || 'market_cap_desc'
        }
    }

    @action
    initData = (query) => {
        this.setProperties({ cryptocurrencyTableLoading: true });
        this.getCryptocurrencyData(query).then((result) => {
            this.cryptocurrencyDataTable = result;
            this.setProperties({ cryptocurrencyTableLoading: false })
        })
    }

    @computed get cryptocurrencyColumns() {
        return (
            [
                {
                    title: 'Coin',
                    dataIndex: 'id',
                    key: 'id',
                    render: (text, record) => (
                        <div><Avatar className="coin-logo" size="small" src={record.image}/> {record.name}</div>
                    ),
                },
                {
                    title: 'Price',
                    dataIndex: 'current_price',
                    key: 'current_price',
                    render: (data) => (
                        <div>{formatCurrency(data, this.money)}</div>
                    ),
                },
                {
                    title: 'Change',
                    dataIndex: 'price_change_percentage_24h',
                    key: 'price_change_percentage_24h',
                    render: (data = 0) => {
                        if (data) {
                            return (
                                <Tag color={(data && data > 0) ? "green" : "volcano"}>
                                    {(data && data > 0) ? `+${data.toFixed(2)}%` : `${data.toFixed(2)}%`}
                                </Tag>
                            )
                        }
                        return (<div></div>)
                    }
                },
                {
                    title: 'Volume',
                    dataIndex: 'total_volume',
                    sorter: true,
                    key: 'total_volume',
                    render: (data) => (
                        <div>{formatCurrency(data, this.money)}</div>
                    ),
                },
                {
                    title: 'Market Cap',
                    dataIndex: 'market_cap',
                    sorter: true,
                    key: 'market_cap',
                    render: (data) => (
                        <div>{formatCurrency(data, this.money)}</div>
                    ),
                }
            ]
        )
    }

    @action handleTableChange = (pagination, filters, sorter) => {
        const { order, field } = sorter;
        let sortOrder;
        switch (field) {
            case 'market_cap':
                sortOrder = order === 'ascend' ? 'market_cap_asc' : 'market_cap_desc';
            break;
            case 'total_volume':
                sortOrder = order === 'ascend' ? 'volume_asc' : 'volume_desc';
            break;
        }
        this.setProperties({
          sortOrder,
        });
    };

    @action setProperties = (newValue) => {
        Object.assign(this, newValue);
    }
    
}


const AppCryptocurrencyTabStore = new CryptocurrencyTabStore();

export default AppCryptocurrencyTabStore;