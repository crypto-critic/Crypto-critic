import React from 'react';
import { observable, action, computed, observe } from 'mobx';
import { Input, Button, Icon, Avatar, Tag } from 'antd';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { GlobalStore } from '../../../stores';
import { getMasternodeData } from '../../../services/homePage.service';
import { formatCurrency } from '../../../services/formatCurrency.service';

const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
        <Input
            ref={node => {
            this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
        >
            Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
        </Button>
        </div>
    ),
    filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
        record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
        if (visible) {
        setTimeout(() => this.searchInput.select());
        }
    },
    render: text => (
        <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
        />
    ),
});

class MasternodeTabStore {
    constructor() {
        this.getMasternodeData = getMasternodeData;
        this.getColumnSearchProps = getColumnSearchProps;
        this.initData();
        observe(this, 'money', (newValue) => {
            this.initData(newValue);
        })
    }

    @computed get money() {
        return GlobalStore.money;
    }

    @observable masternodeTableLoading = false;

    @observable subscribeCoin = undefined;

    @observable masternodeDataTable = undefined;

    @action
    initData = () => {
        this.setProperties({ masternodeTableLoading: true })
        this.getMasternodeData(this.money).then((result) => {
            this.masternodeDataTable = result;
            this.setProperties({ masternodeTableLoading: false })
        })
    }

    @computed get masternodeColumns() {
        return (
            [
                {
                    title: 'Coin',
                    dataIndex: 'id',
                    key: 'id',
                    render: (text, record) => (
                        <div><Avatar className="coin-logo" size="small" src={record.image}/><Link to={{
                            pathname:`/explorer/${record.id}`,
                            query: {
                                name: record.name,
                                image: record.image
                            }
                        }}> {record.name}</Link></div>
                    ),
                    ...this.getColumnSearchProps
                },
                {
                    title: 'Price',
                    dataIndex: 'current_price',
                    key: 'current_price',
                    render: (data) => (
                        <div>{formatCurrency(data, this.money)}</div>
                    ),
                    ...this.getColumnSearchProps
                },
                {
                    title: 'Change',
                    dataIndex: 'price_change_percentage_24h',
                    key: 'price_change_percentage_24h',
                    render: (data) => (
                        <Tag color={data > 0 ? "green" : "volcano"}>
                            {data > 0 ? `+${data.toFixed(2)}%` : `${data.toFixed(2)}%`}
                        </Tag>
                    ),
                    ...this.getColumnSearchProps
                },
                {
                    title: 'Volume',
                    dataIndex: 'total_volume',
                    key: 'total_volume',
                    render: (data) => (
                        <div>{formatCurrency(data, this.money)}</div>
                    ),
                    ...this.getColumnSearchProps
                },
                {
                    title: 'Market Cap',
                    dataIndex: 'market_cap',
                    key: 'market_cap',
                    render: (data) => (
                        <div>{formatCurrency(data, this.money)}</div>
                    ),
                    ...this.getColumnSearchProps
                },
                {
                    title: 'ROI',
                    dataIndex: 'ROI',
                    key: 'ROI',
                    render: (data) => (
                        <Tag color="blue">
                            {`${data}%`}
                        </Tag>
                    ),
                    ...this.getColumnSearchProps
                },
                {
                    title: 'Daily Income',
                    dataIndex: 'dailyIncome',
                    key: 'dailyIncome',
                    render: (data) => (
                        <div>{formatCurrency(data, this.money)}</div>
                    ),
                    ...this.getColumnSearchProps
                }
            ]
        )
    }

    @action setProperties = (newValue) => {
        Object.assign(this, newValue);
    }
    
}


const AppMasternodeTabStore = new MasternodeTabStore();

export default AppMasternodeTabStore;