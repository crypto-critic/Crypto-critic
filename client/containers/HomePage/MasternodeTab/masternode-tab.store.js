import React from 'react';
import { observable, action, computed, observe } from 'mobx';
import { Input, Button, Icon, Avatar, Tag } from 'antd';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { GlobalStore } from '../../../stores';
import { coinService } from '../../../services/homePage.service';
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
        this.coinService = coinService;
        this.getColumnSearchProps = getColumnSearchProps;
        this.initData();
        observe(this, 'money', this.initData);
        observe(this, 'tableQuery', this.initData);
    }

    @computed get money() {
        return GlobalStore.money;
    }

    @observable masternodeTableLoading = false;

    @observable subscribeCoin = undefined;

    @observable masternodeDataTable = undefined;

    @observable tableQuery = {};

    @action
    initData = () => {
        this.setProperties({
            masternodeTableLoading: true,
            masternodeDataTable: []
        })
        this.coinService.find({
            query: {
                ...this.tableQuery,
                $select: [
                    `name`,
                    `symbol`,
                    'image',
                    `marketData.currentPrice.${this.money}`,
                    `marketData.marketCap.${this.money}`,
                    `marketData.totalVolume.${this.money}`,
                    `marketData.priceChangePercentage24h.${this.money}`,
                    `incomeData.ROI`,
                    `incomeData.dailyIncome.${this.money}`,
                    `incomeData.weeklyIncome.${this.money}`,
                    `incomeData.monthlyIncome.${this.money}`,
                    `incomeData.yearlyIncome.${this.money}`,
                ]
            }
        }).then((result) => {
            this.masternodeDataTable = result.data;
            this.setProperties({ masternodeTableLoading: false })
        })
    }

    @computed get masternodeColumns() {
        return (
            [
                {
                    title: 'Coin',
                    dataIndex: 'coinId',
                    key: 'coinId',
                    render: (text, record) => (
                        <div><Avatar className="coin-logo" size="small" src={record.image.small}/><Link to={{
                            pathname:`/explorer/${record.symbol}`,
                            query: {
                                name: record.name,
                                image: record.image.small
                            }
                        }}> {record.name}</Link></div>
                    ),
                    sorter: true,
                    ...this.getColumnSearchProps
                },
                {
                    title: 'Price',
                    dataIndex: 'marketData.currentPrice',
                    key: 'currentPrice',
                    render: (data) => (
                        <div>{formatCurrency(data[this.money], this.money)}</div>
                    ),
                    sorter: true,
                    ...getColumnSearchProps
                },
                {
                    title: 'Change',
                    dataIndex: 'marketData.priceChangePercentage24h',
                    key: 'priceChangePercentage24h',
                    render: (data) => (
                        <Tag color={data[this.money] > 0 ? "green" : "volcano"}>
                            {data > 0 ? `+${data[this.money].toFixed(2)}%` : `${data[this.money].toFixed(2)}%`}
                        </Tag>
                    ),
                    sorter: true,
                    ...this.getColumnSearchProps
                },
                {
                    title: 'Volume',
                    dataIndex: 'marketData.totalVolume',
                    key: 'totalVolume',
                    render: (data) => (
                        <div>{formatCurrency(data[this.money], this.money)}</div>
                    ),
                    sorter: true,
                    ...this.getColumnSearchProps
                },
                {
                    title: 'Market Cap',
                    dataIndex: 'marketData.marketCap',
                    key: 'marketCap',
                    render: (data) => (
                        <div>{formatCurrency(data[this.money], this.money)}</div>
                    ),
                    sorter: true,
                    ...this.getColumnSearchProps
                },
                {
                    title: 'ROI',
                    dataIndex: 'incomeData.ROI',
                    key: 'ROI',
                    render: (data) => (
                        <Tag color="blue">
                            {`${data.toFixed(2)}%`}
                        </Tag>
                    ),
                    sorter: true,
                    ...this.getColumnSearchProps
                },
                {
                    title: 'Daily Income',
                    dataIndex: 'incomeData.dailyIncome',
                    key: 'dailyIncome',
                    render: (data) => (
                        <div>{formatCurrency(data[this.money], this.money)}</div>
                    ),
                    sorter: true,
                    ...this.getColumnSearchProps
                },
                // {
                //     title: 'Weekly Income',
                //     dataIndex: 'incomeData.weeklyIncome',
                //     key: 'weeklyIncome',
                //     render: (data) => (
                //         <div>{formatCurrency(data[this.money], this.money)}</div>
                //     ),
                //     sorter: true,
                //     ...this.getColumnSearchProps
                // },
                // {
                //     title: 'Yearly Income',
                //     dataIndex: 'incomeData.yearlyIncome',
                //     key: 'yearlyIncome',
                //     render: (data) => (
                //         <div>{formatCurrency(data[this.money], this.money)}</div>
                //     ),
                //     sorter: true,
                //     ...this.getColumnSearchProps
                // }
            ]
        )
    }

    @action handleTableChange = (pagination, filters, sorter) => {
            const { order, field } = sorter;
            if (field) {
                this.setProperties({
                    tableQuery: {
                        $sort: { [field]: order === 'ascend'? 1 : (order === 'descend' ? -1 : 0) }
                    }
                })
            }
        };

    @action setProperties = (newValue) => {
        Object.assign(this, newValue);
    }
    
}


const AppMasternodeTabStore = new MasternodeTabStore();

export default AppMasternodeTabStore;