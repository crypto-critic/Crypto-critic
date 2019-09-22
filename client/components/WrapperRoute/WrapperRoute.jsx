import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const WrapperRoute = ({ component: Component, role, opts, ...rest}) => {
    if (opts.accessRoles.includes(role)) {
    return (<Route path={opts.path} component={Component} {...rest} />)
    }
    return <Redirect to={{ pathname: opts.redirectPath }} />
}

export default WrapperRoute;