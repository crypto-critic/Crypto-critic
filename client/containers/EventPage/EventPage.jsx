import React from 'react';
import { Table, Tabs, Card } from 'antd';
import { observer } from 'mobx-react';
const { TabPane } = Tabs;

const EventCard = (props) => {


    return (
        <Card style={{ width: 300, marginTop: 16 }}>
            <Meta
                avatar={<Avatar src="../../assets/img/bitcoi.png" />}
                title="Card title"
                description="This is the description"
            />
        </Card>
    )
}

export default class EventPage extends React.Components {
    render() {
        [1, 2, 3].map(item => {
            return (
                <EventCard />
            )
        })
    }
}