import React from 'react';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import { history } from './services/history';
import SessionStore from './stores/session.store';
import UserStore from './stores/user.store';

import { WrapperLoadable, WrapperRoute } from './components';
import Layout from './layouts/PrimaryLayout'
import './app.scss'
import { login, register } from './endpoints';
import { Login } from './containers';
// const Login = WrapperLoadable('./containers/Login/Login');
const Registration = WrapperLoadable('./containers/Registration/Registration');

@observer
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.SessionStore = SessionStore;
        this.UserStore = UserStore;
    }
    render() {
        const { loginStatus } = this.SessionStore;
        const role = this.UserStore.role || 'non-user';
        return (
            <Router>
                <Layout>
                    <Route>
                        <Switch>
                            <Route path="/login" component={Login} />
                            {/* <WrapperRoute component={Login} opts={login} role={role} /> */}
                            {/* <WrapperRoute component={Registration} opts={register} role={role} /> */}
                        </Switch>
                    </Route>
                </Layout>
            </Router>
        );
    }
}


// import React from 'react';

// // the hook
// import { useTranslation } from 'react-i18next';

// function App () {
//   const { t, i18n } = useTranslation();
//   return <h1>{t('Welcome to React')}</h1>
// }

// export default App;