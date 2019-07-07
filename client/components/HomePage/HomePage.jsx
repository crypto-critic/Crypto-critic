import React from 'react';
import CardIndex from '../CardIndex/CardIndex'
import './homepage.css'

class HomePage extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className='home-quotation'>
                <div className="home-tickers-index clear">
                   <CardIndex
                        coinName={'bitcoin'}
                        title = {'Top Volume'}
                        price = {10000}
                        change = {10}
                   />
                    <CardIndex
                        coinName={'bitcoin'}
                        title = {'Top Volume'}
                        price = {10400}
                        change = {13}
                    />
                    <CardIndex
                        coinName={'bitcoin'}
                        title = {'Top Volume'}
                        price = {10000}
                        change = {10}
                    />
                    <CardIndex
                        coinName={'bitcoin'}
                        title = {'Top Volume'}
                        price = {1000}
                        change = {-12}
                    />
                    <CardIndex
                        coinName={'bitcoin'}
                        title = {'Top Volume'}
                        price = {10000}
                        change = {-0.14}
                    />
                </div>
            </div>
        );
    }
}

export default HomePage