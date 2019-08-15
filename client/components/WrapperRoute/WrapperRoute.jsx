import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const WrapperRoute = ({ component: Component, role, opts }) => (
    <Route path={opts.path} render={props => (
        opts.accessRoles.includes(role)
            ? <Component {...props} />
            : <Redirect to={{ pathname: opts.redirectPath, state: { from: props.location } }} />
    )} />
);

export default WrapperRoute;