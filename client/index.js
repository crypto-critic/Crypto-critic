import React from 'react'
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { SessionStore, UserStore, GlobalStore } from './stores';

const appStore = {
    sessionStore: SessionStore,
    userStore: UserStore,
    globalStore: GlobalStore,
}

import App from './App'
render(
    <Provider {...appStore}>
        <App />
    </Provider>
, document.getElementById('wrapper'));
