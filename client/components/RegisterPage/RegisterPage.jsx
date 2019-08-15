import React from 'react';
import { observer } from 'mobx-react';
import { Link, Route, Redirect } from 'react-router-dom';
import RegisterStore from './register.store';
import './register.scss'

@observer
export default class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.Store = RegisterStore;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user, setUser } = this.Store;
        setUser(name, value)
    }

    handleSubmit(event) {
        event.preventDefault();
        const { setSubmitted, user, register, registerStatus } = this.Store; 
        setSubmitted(true);
        if (user.name && user.email && user.password && user.password_confirm) {
            register(user);
            if (registerStatus === false) {
                setSubmitted(false);
            }
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted, registerStatus } = this.Store;
        return (
            <div className="registerpage">
                <div className="title"><i className="fas fa-edit" /> {` `}REGISTER</div>
                <br />
                {
                    registerStatus === false? 
                    (
                        <form name="form" onSubmit={this.handleSubmit}>
                            <div className={'form-group' + (submitted && !user.name ? ' has-error' : '')}>
                                <label className={submitted && !user.name ? "warning" : "properties"} htmlFor="name">Name {submitted && !user.name && ' is required'}</label>
                                <input type="text" className="form-control" name="name" value={user.name} onChange={this.handleChange} />
                            </div>
                            <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                <label className={submitted && !user.email ? "warning" : "properties"} htmlFor="email">Email {submitted && !user.email && ' is required'}</label>
                                <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                            </div>
                            <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                <label className={submitted && !user.password ? "warning" : "properties"} htmlFor="password">Password {submitted && !user.password && ' is required'}</label>
                                <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                            </div>
                            <div className={'form-group' + (submitted && !user.password_confirm ? ' has-error' : '')}>
                                <label className={submitted && !user.password_confirm ? "warning" : "properties"} htmlFor="password">Password confirm {submitted && !user.password_confirm && ' is required'}</label>
                                <input type="password" className="form-control" name="password_confirm" value={user.password_confirm} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <button className="button">Register</button>
                                {registering && 
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                                <Link to="/login" className="btn btn-link button-link">Cancel</Link>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <p>Register success! Please Login</p>
                            <Link to="/login" className="button-link">Cancel</Link>
                        </div>
                    )
                }

                
            </div>
        );
    }
}


