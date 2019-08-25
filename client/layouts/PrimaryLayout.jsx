import React, { Component, Fragment } from 'react';
import { BackTop, Layout, Drawer, ConfigProvider } from 'antd';
import { I18nProvider } from '@lingui/react';
import GlobalStore from '../stores/global.store';
import SessionStore from '../stores/session.store';
import UserStore from '../stores/user.store';
import { Header } from '../components';
import { observer } from 'mobx-react';
import en_US from 'antd/lib/locale-provider/en_US';
import vi_VN from 'antd/lib/locale-provider/vi_VN';

const languages = {
  en: en_US,
  vi: vi_VN
}
import './PrimaryLayout.scss'

const { Content } = Layout

@observer
class PrimaryLayout extends Component {
  constructor(props) {
      super(props);
      this.globalStore = GlobalStore;
      this.sessionStore = SessionStore;
      this.userStore = UserStore
  }
  

  render() {
    const { globalStore, sessionStore, userStore } = this;
    const { children } = this.props;
    const { language, catalogs } = globalStore;
    console.log('language: ', language);
    return (
      <ConfigProvider locale={languages[language]}>
        <I18nProvider language={language} catalogs={catalogs}>
          <Layout>
              <Header />
              <Content
                className="main-content"
              >
                  {children}
              </Content>
              <BackTop
              />
          </Layout>
        </I18nProvider>
      </ConfigProvider>
    )
  }
}

export default PrimaryLayout
