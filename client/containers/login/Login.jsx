import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable, action, computed, observe } from 'mobx';
import { Trans, withI18n } from '@lingui/react'
import { Form, Icon, Input, Button, Checkbox, Divider } from 'antd';
import { authenticationConstants } from '../../constants/global.constant';
import { SessionStore } from '../../stores';
import { login } from '../../endpoints';
import './login.less'
// import 'antd/dist/antd.less';
const { AUTHENTICATED } = authenticationConstants;

@withI18n()
@Form.create()
@observer
class LoginForm extends React.Component {
  @observable submitted = false;

  @action setSubmit = (value) => this.submitted = value;

  @computed get authenticationStatus() {
    return SessionStore.authenticationStatus;
  }
  
  constructor(props) {
    super(props);
    this.sessionStore = SessionStore;
    this.sessionStore.setProperties({ loginError: {} });
    observe(this, "authenticationStatus", ({ newValue }) => {
      if (newValue === AUTHENTICATED){
        this.props.history.push(login.secondaryPath)
      };
    })
  }

  handleSubmit = e => {
    this.setSubmit(true);
    e.preventDefault();
    const { login, authenticationStatus } = this.sessionStore;
    const { form: { validateFieldsAndScroll }, history } = this.props;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        setTimeout(() => {
          login(values)
          this.setSubmit(false);
        }, 1000)
      }
    });
  };

  render() {
    const { i18n, form: { getFieldDecorator } } = this.props;
    const { submitted } = this;
    const { loginError, handleChange } = this.sessionStore;
    return (
      <Form
        className="login-form"
      >
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: i18n.t`Please input your email!` }],
          })(
            <Input
              handleChange={handleChange}
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
              handleChange={handleChange}
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
          <Divider>OR</Divider>
          <div className="login-row">
            <Button type="link"><i className="fab fa-2x fa-facebook-square"></i></Button>
            <Button type="link"><i className="fab fa-2x fa-github"></i></Button>
            <Button type="link"><i className="fab fa-2x fa-twitter"></i></Button>
          </div>
          <Trans>Or <Link to="/user/register">register now!</Link></Trans>
          <div className={loginError.type}><Trans>{loginError.message}</Trans></div>
        </Form.Item>
      </Form>
    );
  }
}

export default LoginForm;