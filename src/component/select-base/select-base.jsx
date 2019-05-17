import React, { Children } from "react";
import 'styling/semantic.less';
import { Select } from 'semantic-ui-react';
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
export class SelectBase extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    onChange(data){
        this.props.changeBase(data);
        this.setState({
          base: data
        })
    }
    render(){
        // const {marketdata, base, totalcoin} = this.state;
        const {children, changeBase} = this.props;
        // console.log(localStorage.getItem("cacheCurrency"));
        return (
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
        );
      }
}
