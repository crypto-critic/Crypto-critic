import React from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
// import {AppLayout} from './components/AppLayout'
import { connect } from 'react-redux';

import {LoginPage} from "./components/LoginPage";
import {RegisterPage} from "./components/RegisterPage";
import HomePage from './components/HomePage/HomePage';
import AgTable from './components/AgTable/AgTable2'

// import Loadable from "react-loadable";
// const LoginPage = Loadable({
//     loader: () =>
//         import("./LoginPage"),
//     loading: () => null
// });
// const RegisterPage = Loadable({
//     loader: () =>
//         import("./RegisterPage"),
//     loading: () => null
// });
const UserRoute = ({ component: Component, logInState, ...rest }) => (
    <Route {...rest} render={props => (
        logInState === 'SUCCESS'
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
);
const AnynomousRoute = ({ component: Component, logInState, ...rest }) => (
    <Route {...rest} render={props => (
        logInState !== 'SUCCESS'
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
);

export class App1 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {user} = this.props;
        let context = (
            <Switch>
                <UserRoute exact path="/" logInState={user.state} component={HomePage} />
                <AnynomousRoute path="/login" logInState={user.state} component={LoginPage} />
                <AnynomousRoute path="/register" logInState={user.state} component={RegisterPage} />
                <Route exact path="/home" component={HomePage} />
                {/* <Route exact path="/table" component={AgTable} /> */}
            </Switch>
        );
        return (
            <div>
                {context}
                {/* <AppLayout children={context}/> */}
            </div>
        );
    }
}
const withRouterApp = withRouter(App1);

function mapStateToProps(state) {
    return {
        user: state.authentication
    };
}

const connectedApp = connect(mapStateToProps)(withRouterApp);
export { connectedApp as App };
