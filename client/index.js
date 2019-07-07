import React from 'react'
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './services/store';
import AppInit from './AppInit'

render(
    <Provider store={store().store}>
        <PersistGate loading={null} persistor={store().persistor}>
        <AppInit />
        </PersistGate>
    </Provider>,
    document.getElementById('wrapper')
);