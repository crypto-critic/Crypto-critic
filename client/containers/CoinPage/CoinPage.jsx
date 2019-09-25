import React from 'react';
import { Table, Tabs, Card, Row, Col, Avatar, Tag, Divider } from 'antd';
import { observer } from 'mobx-react';
import CoinPageStore from './coin-page.store';
import './coin-page.less'
const { TabPane } = Tabs;

@observer
class HomePage extends React.Component {
    constructor(props) {
        super(props)
        const { id } = this.props.match.params;
        this.store = new CoinPageStore(id);
    }

    render() {
        const { coinPageData, loading } = this.store;
        if ( coinPageData ) {
            const { image: { large: iconLarge }, name, categories, links} = coinPageData;
            console.log('links: ', links);
            return (
                <div className="coin-page">
                    <Row>
                        <Col span={6}>
                            <Card
                                // bordered={false}
                                style={{
                                    marginBottom: 24,
                                }}
                                loading={loading}
                            >
                                <div className="avatarHolder">
                                    <Avatar className="avar" src={iconLarge} alt=""/>
                                    <p className="name">{name}</p>
                                    <div>
                                        {categories.map(item => (
                                            <Tag>{item}</Tag>
                                        ))}
                                    </div>
                                </div>
                                <Divider />
                                <div className={styles.detail}>
                                    <p>
                                    <i className={styles.title} />
                                    {currentUser.title}
                                    </p>
                                    <p>
                                    <i className={styles.group} />
                                    {currentUser.group}
                                    </p>
                                    <p>
                                    <i className={styles.address} />
                                    {currentUser.geographic.province.label}
                                    {currentUser.geographic.city.label}
                                    </p>
                                </div>
                            </Card>
                        </Col>
                        <Col span={18}>
    
                        </Col>
                    </Row>
                </div>
            )
        }
        return (<div></div>)
    }
}

export default HomePage;