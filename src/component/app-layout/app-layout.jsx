import React, { Children } from "react";
import {Link} from "react-router-dom";
import 'styling/semantic.less';
import AppLayoutForm from './app-layout-form';
// import StatusBar from './status-bar';
import { Input, Menu , Grid, Segment, Search, Divider, Dropdown, Select} from 'semantic-ui-react';
import Sa from './mysearch.jsx';
import './app-layout.css';
var axios = require('axios');
const Adv = (<div>this is advertising</div>);
const S = (<div>this is search</div>);
const F = (<div>this is footer</div>);
const Sl = (<div>this is select</div>);
const M = (<div>
              <Menu secondary>
                <Menu.Item className='logo'>
                  {'BLOCKSHARE'}
                </Menu.Item>
                <Menu.Item>
                <Dropdown text='Ranking' className='MenuDropdown'>
                  <Dropdown.Menu>
                    <Dropdown.Item text='New' />
                    <Dropdown.Item text='Open...' description='ctrl + o' />
                    <Dropdown.Item text='Save as...' description='ctrl + s' />
                  </Dropdown.Menu>
                </Dropdown>
                </Menu.Item>
                <Menu.Item>
                <Dropdown text='Services' className='MenuDropdown'>
                  <Dropdown.Menu>
                    <Dropdown.Item text='New' />
                    <Dropdown.Item text='Open...' description='ctrl + o' />
                    <Dropdown.Item text='Save as...' description='ctrl + s' />
                  </Dropdown.Menu>
                </Dropdown>
                </Menu.Item>
                </Menu>
            </div>);
const countryOptions = [
  { key: 'BTC', value: 'BTC', icon: 'bitcoin', text: 'Bitcoin' },
  { key: 'USD', value: 'USD', flag: 'us', text: 'United States' },
  { key: 'AUD', value: 'AUD', flag: 'au', text: 'Australian dollar' },
  { key: 'BGN', value: 'GBN', flag: 'bg', text: 'Bulgarian lev' },
  { key: 'CAD', value: 'CAD', flag: 'ca', text: 'Canadian dollar' },
  { key: 'CNY', value: 'CNY', flag: 'cn', text: 'Chinese yuan' },
  { key: 'CZK', value: 'CZK', flag: 'cz', text: 'Czech koruna' },
  { key: 'EUR', value: 'EUR', flag: 'eu', text: 'Euro' },
  { key: 'JPY', value: 'JPY', flag: 'jp', text: 'Japanese yen' },
  { key: 'KRW', value: 'KRW', flag: 'kr', text: 'Korean won' },
  { key: 'RUB', value: 'RUB', flag: 'ru', text: 'Russian rouble' },
  { key: 'VND', value: 'VND', flag: 'vn', text: 'Vietnam dong' },
];

export class AppLayout extends React.Component{
    constructor(props){
        super(props);
        this.state={
          base: "USD",
          open: false,
          activeItem: 'home'
        };
      }
      onChange(data){
        this.props.changeBase(data);
        this.setState({
          base: data
        })
        console.log('son')
      }
  render(){
    const {base} = this.state;
    const {children, changeBase} = this.props;
    return (
        <div>
          <AppLayoutForm
            advertising = {Adv}
            statusbar = {<div>statusbar</div>}
            search = {<Sa />}
            menubar = {M}
            selectbase = {
              <div>
                <Select onChange={(event, data)=> {
                          this.setState({value: data.value});
                          this.onChange(data.value) ;
                          }
                        }
                        placeholder='Select base currency' options={countryOptions}
                        value={this.state.base} 
                        id="select" >
                </Select>  
              </div>
            }
            footer = {F}
            children = {children}
          >
          </AppLayoutForm>
        </div>
    );
  }
}
