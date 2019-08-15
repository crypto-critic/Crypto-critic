import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { FormattedMessage} from 'react-intl'
import { Layout, Menu, Breadcrumb, Icon, Avatar, Badge, Dropdown, Tooltip, Divider, Button } from 'antd';
import 'antd/dist/antd.less';

import GlobalStore from '../../stores/global.store';
import SessionStore from '../../stores/session.store';
import UserStore from '../../stores/user.store';
import { languageDefinition } from '../../config';
import classnames from 'classnames'
import styles from './Header.less'
const { SubMenu } = Menu

@observer
export default class Header extends React.Component {
    constructor(props){
        super(props);
        this.GlobalStore = GlobalStore;
        this.SessionStore = SessionStore;
        this.UserStore = UserStore;
    }

    handleChange = (data) => {
        const { setLocalStorage } = this.GlobalStore;
        setLocalStorage(data);
        console.log('change to ', this.GlobalStore.money)
    }

    handleLogout = (e) => {
        const { logout } = this.SessionStore;
        e.key === 'SignOut' && logout();
    }

    render() {
        console.log('render lai')
        const { money, moneys, language, theme } = this.GlobalStore;
        const { loginStatus } = this.SessionStore;
        const { email, firstName, avartar } = this.UserStore;
        const leftContent = [
            <Fragment>
                <img className="logo" src={"assets/img/logo.svg"}/>
                <Divider type="vertical" className="divider"/>
            </Fragment>
        ]
        const rightContent = loginStatus === 'AUTHENTICATED' ? [
            <Menu key="user" mode="horizontal" onClick={this.handleClickMenu}>
              <SubMenu
                title={
                  <Fragment>
                    <span style={{ color: '#999', marginRight: 4 }}>
                        <FormattedMessage
                            id="header.hello"
                            defaultMessage={`Hello, ${name}`}
                            values={{name: <b>{firstName}</b>}}
                        />
                    </span>
                    <Avatar style={{ marginLeft: 8 }} src={avartar} />
                  </Fragment>
                }
              >
                <Menu.Item key="SignOut">
                    <FormattedMessage
                        id="header.signout"
                        defaultMessage={`Sign out`}
                    />
                </Menu.Item>
              </SubMenu>
            </Menu>
        ] : [
            <Menu key="anonymos" mode="horizontal">
                <Menu.Item>
                    <Tooltip
                        placement="bottom"
                        label={
                            <FormattedMessage
                                id="header.login"
                                defaultMessage={`Login`}
                            />
                        }
                    >
                        <Link to="/login"><Icon type="login" /></Link>
                    </Tooltip>
                </Menu.Item>
            </Menu>
        ]
            
        if (languageDefinition) {
            const { languages } = languageDefinition;
            const { i18n } = this.props;
            const currentLanguage = languages.find(
              item => item.linguiKey === i18n._language
            )
            rightContent.unshift(
                <Menu
                key="language"
                selectedKeys={[currentLanguage.linguiKey]}
                onClick={data => {
                    this.handleChange({ key: 'language', value: data.key }) 
                }}
                mode="horizontal"
                >
                    <SubMenu title={<Avatar size="small" src={currentLanguage.flag} />}>
                    {languages.map(item => (
                        <Menu.Item key={item.linguiKey}>
                        <Avatar
                            size="small"
                            style={{ marginRight: 8 }}
                            src={item.flag}
                        />
                        {item.title}
                        </Menu.Item>
                    ))}
                    </SubMenu>
                </Menu>
            )
        }
        
        const menuDropdown = (
            <Menu
            onClick={data => {
                console.log('click', data)
                this.handleChange({ key: 'money', value: data.key }) 
            }}
            mode="horizontal"
            >
                {
                    moneys.map(item => (
                        <Menu.Item key={item}>
                        {item.toUpperCase()}
                        </Menu.Item>
                    ))
                }
            </Menu>
        )
        rightContent.unshift(
            <Dropdown overlay={menuDropdown} placement="bottomLeft">
                <Button>{money.toUpperCase()+ " "}<i className="fas fa-caret-down" /></Button>
            </Dropdown>
            // <Button>
            // <Menu
            //     key="money"
            //     selectedKeys={money}
            //     onClick={data => {
                //         this.handleChange({ money: data.key }) 
                //     }}
                //     mode="horizontal"
                // >
                //     <SubMenu title={money}>
                //     {moneys.map(item => (
                    //         <Menu.Item key={item}>
                    //         {item}
                    //         </Menu.Item>
                    //     ))}
                    //     </SubMenu>
                    // </Menu>
                    // </Button>
                    )
        return (
            <Fragment>
                <Layout.Header className="header" id="layoutHeader" >
                    <div className="leftContainer">{leftContent}</div>
                    <div className="rightContainer">{rightContent}</div>
                </Layout.Header>
            </Fragment>
        );
    }
}
