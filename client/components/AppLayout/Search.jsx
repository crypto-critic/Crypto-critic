import React, { Fragment } from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { AutoComplete, Input, Icon, Button, Avatar } from 'antd';
import { coinInfoService } from '../../services/homePage.service';
const { Search } = Input; 

@observer
export default class MySearch extends React.Component {
    constructor(props) {
        super(props);
    }
    @observable dataSource = [];

    @observable searching = false;

    @action
    onSearch = (key) => {
        this.searching = true;
        coinInfoService.find({
            query: {
                name: { $regex: `${key}` },
                $select: [
                    'name',
                    'symbol',
                    'image',
                ]
            },
        }).then(result => {
        console.log('result: ', result);
            this.searching = false;
            this.dataSource = result.data;
        })
    }

    renderOption = (item) => {
        return (
            <Option key={item.name.toLowerCase()} text={item.name}>
                <Link to={`/coin/${item.name}`} >
                    <Avatar
                        size="small"
                        style={{ marginRight: 8 }}
                        src={item.image}
                    />
                    {item.name} ({item.symbol.toUpperCase()})
                </Link>
            </Option>
        );
    }
    
    render() {
        const { onSearch, onSelect, dataSource, renderOption, searching } = this;
        return (
            <Fragment>
                <AutoComplete
                    size="medium"
                    style={{ width: '100%', paddingRight: '20px' }}
                    dataSource={dataSource.map(renderOption)}
                    onSearch={onSearch}
                    placeholder="Search cryptocurrency"
                    optionLabelProp="text"
                >
()                </AutoComplete>
            </Fragment>
        )
    }
}