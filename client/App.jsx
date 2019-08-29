import React from 'react';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import { history } from './services/history';
import { SessionStore, UserStore } from './stores';
import { WrapperRoute } from './components';
import Layout from './layouts/PrimaryLayout'
import './app.less'
import { login, register } from './endpoints';

import { Login, Register } from './containers';

@observer
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.SessionStore = SessionStore;
        this.UserStore = UserStore;
    }
    render() {
        const { authenticationStatus } = this.SessionStore;
        const role = this.UserStore.role || 'non-user';
 console.log("role ", role);
        return (
            <Router>
                <Layout>
                        <Switch>
                            {/* <Route path="/login" component={Login} /> */}
                            <WrapperRoute component={Login} opts={login} role={role} />
                            {/* <WrapperRoute component={Register} opts={register} role={role} /> */}
                        </Switch>
                </Layout>
            </Router>
        );
    }
}
