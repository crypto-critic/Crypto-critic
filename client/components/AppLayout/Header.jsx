import React, { Fragment, Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Trans, withI18n } from '@lingui/react'
import { Layout, Menu, Breadcrumb, Icon, Avatar, Badge, Dropdown, Tooltip, Divider, Button } from 'antd';
import 'antd/dist/antd.less';
import classnames from 'classnames'
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import { languageDefinition, logoPath } from '../../config';
const { SubMenu } = Menu;
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
        const { authenticationStatus } = this.props.sessionStore;
        const { email, firstName, avatar } = this.props.userStore;

        const leftContent = [
            <div>
                <Link to="/"><img className="logo" src={logoPath}/></Link>
                <Divider type="vertical" className="divider"/>
            </div>
        ]
        const rightContent = authenticationStatus !== 'UNAUTHENTICATED' ? 
        [
            <Menu key="user" mode="horizontal" onClick={this.handleLogout}>
                <SubMenu
                title={
                    <Fragment>
                        <span style={{ color: '#999', marginRight: 4 }}>
                        <Trans>Hi,</Trans>
                        </span>
                        <span>{firstName}</span>
                    <Avatar style={{ marginLeft: 8 }} src={avatar} />
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
            <Menu key="anonymos" mode="horizontal">
                <Menu.Item>
                    <Tooltip
                        placement="bottom"
                        label={<Trans>Login</Trans>}
                    >
                        <Link to="/user/login"><Icon type="user-add" /></Link>
                    </Tooltip>
                </Menu.Item>
            </Menu>
        ]
            
        const currentLanguage = languages.find(
            item => item.languageKey === language
        )
        rightContent.unshift(
            <Menu
            key="language"
            selectedKeys={[currentLanguage.languageKey]}
            onClick={data => {
                this.handleChange({ key: 'language', value: data.key }) 
            }}
            mode="horizontal"
            >
                <SubMenu title={<Avatar size="small" src={currentLanguage.flag} />}>
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
                </SubMenu>
            </Menu>
        )
        
        const menuDropdown = (
            <Menu
            onClick={data => {
                this.handleChange({ key: 'money', value: data.key }) 
            }}
            mode="horizontal"
            >
                {
                    moneys.map(item => (
                        <Menu.Item key={item}>
                        {item}
                        </Menu.Item>
                    ))
                }
            </Menu>
        )
        rightContent.unshift(
            <Dropdown overlay={menuDropdown} placement="bottomLeft">
                <Button>{money}</Button>
            </Dropdown>
        )
        return (
            <Layout.Header className="header" id="layoutHeader" >
                <div className="leftContainer">{leftContent}</div>
                <div className="rightContainer">{rightContent}</div>
            </Layout.Header>
        );
    }
}
