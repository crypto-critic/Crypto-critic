import React, { Fragment, Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Trans, withI18n } from '@lingui/react'
import { Layout, Menu, Breadcrumb, Icon, Avatar, Badge, Dropdown, Tooltip, Divider, Button, Spin } from 'antd';
import { languageDefinition, logoPath } from '../../config';
import Search from './Search';
import classnames from 'classnames'
const { SubMenu } = Menu;
import 'antd/dist/antd.less';
import './header.less'

@inject(stores => stores)
@withI18n()
@observer
export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (data) => {
        const { setLocalStorage } = this.props.globalStore;
        setLocalStorage(data);
    }
    
    handleLogout = (e) => {
        const { logout } = this.props.sessionStore;
        e.key === 'SignOut' && logout();
    }

    render() {
        const { money, moneys, language, languages, theme } = this.props.globalStore;
        const { authenticationStatus, user } = this.props.sessionStore;
        const leftContent = [
            <div>
                <Link to="/"><img className="logo" src={logoPath}/></Link>
                <Divider type="vertical" className="divider"/>
            </div>
        ]
        const rightContent = authenticationStatus === undefined ? [
            <Spin></Spin>
        ] : (authenticationStatus !== 'UNAUTHENTICATED' ? 
        [
            <Menu key="user" mode="horizontal" onClick={this.handleLogout}>
                <SubMenu
                title={
                    <Fragment>
                        <span style={{ color: '#999', marginRight: 4 }}>
                        <Trans>Hi,</Trans>
                        </span>
                        <span>{user.firstName}</span>
                    <Avatar style={{ marginLeft: 8 }} src={user.avatar || ''} />
                  </Fragment>
                }
                >
                    <Menu.Item key="SignOut">
                        <Trans>Sign out</Trans>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        ] : 
        [
            <Menu key="anonymous" mode="horizontal">
                <Menu.Item>
                    <Tooltip
                        placement="bottom"
                        label={<Trans>Login</Trans>}
                    >
                        <Link to="/user/login"><i className="fas fa-lg fa-user"></i></Link>
                    </Tooltip>
                </Menu.Item>
            </Menu>
        ])

        const menuLanguageDropdown = (
            <Menu
                onClick={data => {
                    this.handleChange({ key: 'language', value: data.key }) 
                }}
            >
                {languages.map(item => (
                    <Menu.Item key={item.languageKey}>
                        <Avatar
                            size="small"
                            style={{ marginRight: 8 }}
                            src={item.flag}
                        />
                        {item.title}
                    </Menu.Item>
                ))}
            </Menu>
        )
        
        const menuMoneyDropdown = (
            <Menu
                onClick={data => { this.handleChange({ key: 'money', value: data.key })}} mode="horizontal"
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

        const currentLanguage = languages.find(
            item => item.languageKey === language
        )

        rightContent.unshift(
            <Fragment>
                <Search />
                <Dropdown overlay={menuMoneyDropdown} placement="bottomLeft">
                    <Button>{money.toUpperCase()}</Button>
                </Dropdown>
                <Dropdown overlay={menuLanguageDropdown} placement="bottomLeft">
                    <Avatar
                        // size="small"
                        style={{ marginRight: 8, marginLeft: 20 }}
                        src={currentLanguage.flag}
                    />
                </Dropdown>
            </Fragment>
        )
        return (
            <Layout.Header className="header" id="layoutHeader" >
                <div className="leftContainer">{leftContent}</div>
                <div className="rightContainer">{rightContent}</div>
            </Layout.Header>
        );
    }
}
