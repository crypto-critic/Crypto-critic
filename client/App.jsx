import React, { Fragment } from 'react';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { WrapperRoute } from './components';
import Layout from './layouts/PrimaryLayout'
import './app.less'
import { login, register, home, coin, explorer } from './endpoints';
import { Login, Register, HomePage, CoinPage, ExplorerPage } from './containers';
import UserStore from './services/user.service';
@inject(stores => stores)
@observer
export default class App extends React.Component {
    render() {
        const { authenticationStatus } = this.props.sessionStore;
        const role = this.props.userStore.role || 'non-user';
        console.log('new branch sleeper')
        return (
            <BrowserRouter>
                <Switch>
                    <Layout>
                        <WrapperRoute component={Login} opts={login} role={role}/>
                        <WrapperRoute component={Register} opts={register} role={role}/>
                        <WrapperRoute component={HomePage} opts={home} role={role} exact/>
                        <WrapperRoute component={CoinPage} opts={coin} role={role} />
                        <WrapperRoute component={ExplorerPage} opts={explorer} role={role} />
                    </Layout>
                </Switch>
            </BrowserRouter>
        );
    }
}
