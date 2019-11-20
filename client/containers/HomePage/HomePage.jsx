import React from 'react';
import { Table, Tabs } from 'antd';
import MasternodeTabStore from './MasternodeTab/masternode-tab.store';
import CryptocurrencyTabStore from './CryptocurrencyTab/cryptocurrency-tab.store';
import { observer } from 'mobx-react';
import { CardIndex } from '../../components';
import './home-page.less'
const { TabPane } = Tabs;

@observer
class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.masternodeTabStore = MasternodeTabStore;
        this.cryptocurrencyTabStore = CryptocurrencyTabStore;
    }

    render() {
        const {
            masternodeColumns,
            masternodeDataTable,
            handleTableChange : handleMnTableChange,
            masternodeTableLoading,
        } = this.masternodeTabStore;
        const {
            cryptocurrencyColumns,
            cryptocurrencyDataTable,
            handleTableChange: handleCryptoTableChange,
            cryptocurrencyTableLoading
        } = this.cryptocurrencyTabStore;
        return (
            <Tabs defaultActiveKey="1" className="coins-tab">
                <TabPane tab="Cryptocurrencys" key="1">
                <Table
                        className="ranking-table"
                        columns={cryptocurrencyColumns}
                        loading={cryptocurrencyTableLoading}
                        dataSource={cryptocurrencyDataTable}
                        onChange={handleCryptoTableChange}
                    />
                </TabPane>
                <TabPane tab="Masternodes" key="2">
                    <Table
                        className="ranking-table"
                        columns={masternodeColumns}
                        loading={masternodeTableLoading}
                        dataSource={masternodeDataTable}
                        onChange={handleMnTableChange}
                    />
                </TabPane>
                <TabPane tab="IEOs" key="3">
                    <Table
                        className="ranking-table"
                    />
                </TabPane>
            </Tabs>
            
        )
    }
}

export default HomePage;