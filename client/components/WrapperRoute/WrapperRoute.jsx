import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const WrapperRoute = ({ component: Component, role, opts }) => (
    <Route path={opts.path} render={props => {
        if (opts.accessRoles.includes(role)) {
 console.log("OK ");
            
            return <Component {...props} />
        }
        return <Redirect to={{ pathname: opts.redirectPath, state: { from: props.location } }} />
    }} />
);

export default WrapperRoute;