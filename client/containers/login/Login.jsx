import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable, action, computed, observe } from 'mobx';
import 'antd/dist/antd.less';
import { Trans, withI18n } from '@lingui/react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.less'
import { SessionStore } from '../../stores';
import { login } from '../../endpoints';

@withI18n()
@Form.create()
@observer
class LoginForm extends React.Component {
  @observable submitted = false;

  @action setSubmit = (value) => this.submitted = value;

  @computed get authenticationStatus() {
    return SessionStore.authenticationStatus;
  }
  @computed get loginMessage() {
    return SessionStore.loginMessage;
  }

  constructor(props) {
    super(props);
    this.sessionStore = SessionStore;
    // observe(this, 'authenticationStatus', ({ newValue }) => {
    //   console.log('newValue: ', newValue);
    //   this.props.history.push(login.secondaryPath);
    // })
  }

  handleSubmit = e => {
    this.setSubmit(true);
    e.preventDefault();
    const { login, authenticationStatus } = this.sessionStore;
    const { validateFieldsAndScroll } = this.props.form;
    setTimeout(() => {
      validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          login(values);
        }
      });
      return this.setSubmit(false)
    }, 2000)
  };

  render() {
    const { i18n, form: { getFieldDecorator } } = this.props;
    const { submitted, loginMessage } = this;
    return (
      <Form
      className="login-form"
      >
        {loginMessage && <div className={loginMessage.status}><Trans>{loginMessage.message}</Trans></div>}
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: i18n.t`Please input your email!` }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={i18n.t`Email`}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: i18n.t`Please input your Password!` }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder={i18n.t`Password`}
              onPressEnter={this.handleSubmit}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
          })(<Checkbox><Trans>Remember me</Trans></Checkbox>)}
          <a className="login-form-forgot" href="">
            <Trans>Forgot password</Trans>
          </a>
          <Button
            onClick={this.handleSubmit}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={submitted}
          >
            Log in
          </Button>
          <Trans>Or <Link to="/user/register">register now!</Link></Trans>
        </Form.Item>
      </Form>
    );
  }
}

export default LoginForm;