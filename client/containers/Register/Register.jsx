import React from 'react';
import { observer } from 'mobx-react';
import 'antd/dist/antd.less';
import { observable, action, computed, observe } from 'mobx';
import { Trans, withI18n } from '@lingui/react'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Result
} from 'antd';
import RegisterStore from './register.store';
import './register.less';

import { Link } from 'react-router-dom';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

@withI18n()
@Form.create()
@observer
class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.store = RegisterStore;
  }
  
  handleSubmit = e => {
    const { register, setProperties } = this.store;
    const { validateFieldsAndScroll, setFieldsValue } = this.props.form;
    e.preventDefault();
    setProperties({ registerStatus: 'loading' });
    setTimeout(() => {
      validateFieldsAndScroll((err, values) => {
        if (!err) {
          const { agreement } = values;
          if (agreement && agreement === true) {
            register(values);
            return setFieldsValue({
              email: '',
              password: '',
              password_confirm: '',
              firstName: '',
              lastName: '',
              agreement: false
            })
          } else {
            setProperties({ registerStatus: 'error' })
            return setProperties({
              message: {
                status: 'error',
                message: `Please read & accept agreement!`
              }
            })
          }
          return setProperties({ registerStatus: 'error' })
        }
        return setProperties({ registerStatus: 'error' })
      });
    }, 1000)
  };

  handleConfirmBlur = e => {
    const { confirmDirty, setProperties } = this.store;
    const { value } = e.target;
    setProperties({ confirmDirty: confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback(`Two passwords that you enter is inconsistent!`);
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { confirmDirty } = this.store;
    const { validateFields } = this.props.form;
    if (value && confirmDirty) {
      validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleOnclick = () => {
    this.store.setProperties({
      registerStatus: undefined,
      message: {}
    })
  }

  render() {
    const { i18n, form: { getFieldDecorator } } = this.props;
    const { message, registerStatus } = this.store;
    console.log('message: ', message);
    const { submitted } = this;
    if (registerStatus === 'success') {
      return (
        <Result
          status="success"
          title={i18n.t`Registration Successfully!`}
          subTitle={i18n.t`Please go to your email to confirmation!`}
          extra={[
            <Link to="/"><Button type="primary" key="home" onClick={this.handleOnclick}><Trans>Home Page</Trans></Button></Link>,
            <Link to="/user/login"><Button key="login" onClick={this.handleOnclick}><Trans>Login</Trans></Button></Link>,
          ]}
        />
      )
    }
    return (
      <Form
        className="register"
      >
        {message && <div className={message.status}><Trans>{message.message}</Trans></div>}
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: <Trans>The input is not valid Email!</Trans>
              },
              {
                required: true,
                message: <Trans>Please input your Email!</Trans>
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={i18n.t`Email`}
            />,
          )}
        </Form.Item>

        <Form.Item hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: <Trans>Please input your password!</Trans>
              },
              {
                min: 6,
                message: <Trans>Password require at least 6 characters</Trans>
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder={i18n.t`Password`}
            />
          )}
        </Form.Item>

        <Form.Item hasFeedback>
          {getFieldDecorator('password_confirm', {
            rules: [
              {
                required: true,
                message: <Trans>Please confirm your password!</Trans>,
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(
            <Input
              prefix={<Icon type="copy" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder={i18n.t`Password confirm`}
              onBlur={this.handleConfirmBlur}
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('firstName', {
            rules: [
              { required: true, message: <Trans>Please input your first name!</Trans>, whitespace: true },
              { min: 3, message: <Trans>First Name require at least 3 characters</Trans> },
            ],
          })(
            <Input
              prefix={<Icon type="bars" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={i18n.t`First Name`}
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('lastName')(
            <Input
              prefix={<Icon type="bars" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder={i18n.t`Last Name`}
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
            rules: [
              { required: true, message: <Trans>Please read accept agreement</Trans> },
            ]
          })(
            <Checkbox>
              <Trans>I have read the <Link to="/user/agreement">agreement!</Link></Trans>
            </Checkbox>,
          )}
          <Button
            onClick={this.handleSubmit}
            type="primary"
            htmlType="submit"
            className="register-form-button"
            loading={registerStatus === 'loading'}
          >
            <Trans>Register</Trans>
          </Button>
          <Trans>Or <Link to="/user/login" ><button className="login-button" onClick={this.handleOnclick}>login now!</button></Link></Trans>
        </Form.Item>
      </Form>
    );
  }
}

export default RegisterForm;
          