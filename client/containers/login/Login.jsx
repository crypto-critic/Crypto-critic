import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import 'antd/dist/antd.less';
import { Trans, withI18n } from '@lingui/react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.less'
import { SessionStore } from '../../stores';

@withI18n()
@Form.create()
@observer
class LoginForm extends React.Component {
  @observable submitted = false;

  @action submit = () => this.submitted = true;

  constructor(props) {
    super(props);
    this.sessionStore = SessionStore;
  }

  handleSubmit = e => {
    this.submit();
    e.preventDefault();
    const { login, authenticationStatus } = this.sessionStore;
    console.log('authenticationStatus: ', authenticationStatus);
    const { validateFieldsAndScroll } = this.props.form;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        login(values);
        // authenticationStatus === 'AUTHENTICATED' && history.push('/home');
      }
    });
  };

  render() {
    const { i18n, form: { getFieldDecorator } } = this.props;
    const { submitted } = this;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
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
            initialValue: true,
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
          <Trans>Or <Link to="/register">register now!</Link></Trans>
        </Form.Item>
      </Form>
    );
  }
}

export default LoginForm;