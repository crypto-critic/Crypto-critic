import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Layout from './layouts/PrimaryLayout'
import { login, register, home } from './endpoints';
import './app.less'
@inject(stores => stores)
@observer
export default class App extends React.Component {
    renderNonUser() {
        return (
            <Switch>
                <Layout>
                    <Route exact path={home.path} component={home.component} />
                    <Route exact path={login.path} component={login.component} />
                    <Route exact path={register.path} component={register.component} />
                    {/* <Redirect to={home.path} /> */}
                </Layout>
            </Switch>
        )
    }

    renderUser() {
        return (
            <Switch>
                <Layout>
                    <Route path={home.path} component={HomePage} />
                    <Redirect to={home.path}/>
                </Layout>
            </Switch>
        )
    }
    render() {
        const { authenticationStatus } = this.props.sessionStore;
        const role = /* this.props.userStore.role || */'non-user';
        switch (role) {
            case 'non-user': {
                return this.renderNonUser();
                break;
            }
            case 'user': {
                return this.renderUser();
                break;
            }
            default: 
                return this.renderNonUser();
        }
    }
}
