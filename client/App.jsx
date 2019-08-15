import React from 'react';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { observer } from 'mobx-react';
// import { history } from 'services/history';
// import SessionStore from 'stores/session.store';
// import UserStore from 'stores/user.store';

// import { WrapperLoadable, WrapperRoute } from './components';
// import Layout from './layouts/PrimaryLayout'
// import './app.scss'
// import router from './router';
// const { login, registration } = router;

// const Login = WrapperLoadable('./containers/Login/Login');
// const Registration = WrapperLoadable('./containers/Registration/Registration');
export function formatDate({ locale, formats, onError, timeZone, }, state, ...[value, options = {}]) {
    console.log('aaa')
}
// @observer
export default class App extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        // this.SessionStore = SessionStore;
        // this.UserStore = UserStore;
    }
    render() {
        // const { loginStatus } = this.SessionStore;
        // const role = this.UserStore.role || 0;
        return (
            <Router>
                {/* <Layout>
                    <Route> */}
                        <Switch>
                            {/* <Route path="/" component={Login} /> */}
                            {/* <WrapperRoute component={Login} opts={login} role={role} /> */}
                            {/* <WrapperRoute component={Registration} opts={registration} role={role || 0} /> */}
                        </Switch>
                    {/* </Route>
                </Layout> */}
            </Router>
        );
    }
}


