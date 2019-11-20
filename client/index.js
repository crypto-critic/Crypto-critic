import React from 'react'
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import {
    SessionStore,
    // UserStore,
    GlobalStore,
} from './stores';

const appStore = {
    sessionStore: SessionStore,
    // userStore: UserStore,
    globalStore: GlobalStore,
}

import App from './App'
render(
    <Provider {...appStore}>
        <Router>
            <App />
        </Router>
    </Provider>
, document.getElementById('wrapper'));
