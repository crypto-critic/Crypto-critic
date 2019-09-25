import React from 'react';
import { Table, Tabs, Avatar, Card } from 'antd';
import ExplorerPageStore from './explorer-page.store';
import { observer } from 'mobx-react';
import './explorer-page.less'
const { TabPane } = Tabs;

@observer
class ExplorerPage extends React.Component {
    constructor(props) {
        super(props)
        const { coinId } = props.match.params;
        this.store = new ExplorerPageStore({ coinId });
    }
    render() {
        const { explorerDataTable, explorerTableLoading, explorerColumns, coinInfo } = this.store;
        return (
            <div className="explorer-main">
                {
                    coinInfo && <h5><Avatar src={coinInfo.image.large} /> {coinInfo.name}</h5>
                }
                <Card>
                    <Card.Grid className="card-half">
                        <Card title="Blockchain Data">

                        </Card>
                    </Card.Grid>
                    <Card.Grid className="card-half">
                        <Card title="Market Data">

                        </Card>
                    </Card.Grid>
                </Card>
                <Table
                    className="ranking-table"
                    columns={explorerColumns}
                    dataSource={explorerDataTable}
                    loading={explorerTableLoading}
                />
            </div>
        )
    }
}

export default ExplorerPage;