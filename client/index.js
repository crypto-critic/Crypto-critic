import React from 'react'
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './services';
import MainRoutes from './main-routers'

render(
    <Provider store={store}>
        <MainRoutes />
    </Provider>,
    document.getElementById('wrapper')
);