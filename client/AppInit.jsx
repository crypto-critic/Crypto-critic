import React from 'react';
import { Router} from 'react-router-dom';
import {App} from './App';
import {history} from './services'
export class AppInit extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Router history={history}>
                    <App />
                </Router>
            </div>
        );
    }
}

export default AppInit;
