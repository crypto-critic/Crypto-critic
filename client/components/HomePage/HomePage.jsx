import React from 'react';
import CardIndex from '../CardIndex/CardIndex';
import { observer } from 'mobx-react';
import GlobalStore from '../../stores/global.store';
import './homepage.css';
import axios from 'axios';
import AgTable from '../AgTable/AgTable';
import 'semantic-ui-css/semantic.min.css'
import { Flag, Menu } from 'semantic-ui-react';
@observer
export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.GlobalStore = GlobalStore;
    }
    
    render() {
        const { activeItem } = this.state;
        const { money } = this.GlobalStore;
        return (
            <div className='home-quotation'>
                <div className="home-tickers-index clear">
                <Flag name='ae' />
    <Flag name='france' />
    <Flag name='myanmar' />
    <Menu>
        <Menu.Item
          name='editorials'
          active={activeItem === 'editorials'}
        >
          Editorials
        </Menu.Item>

        <Menu.Item name='reviews' active={activeItem === 'reviews'} >
          Reviews
        </Menu.Item>

        <Menu.Item
          name='upcomingEvents'
          active={activeItem === 'upcomingEvents'}
          
        >
          Upcoming Events
        </Menu.Item>
      </Menu>
                    <CardIndex
                        title = {'Top Marketcap'}
                        id = {'dash'}
                        vs_currency={money}
                    />
                    <CardIndex
                        title = {'Top Marketcap'}
                        id = {'dash'}
                        vs_currency={money}
                    />
                    <CardIndex
                        title = {'Top Marketcap'}
                        id = {'dash'}
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
                </div>
            </div>
        );
    }
};
