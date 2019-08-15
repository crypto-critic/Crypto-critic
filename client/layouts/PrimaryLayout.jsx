import React, { Component, Fragment } from 'react'
import { ConfigProvider } from 'antd'
import { I18nProvider } from '@lingui/react'
import { BackTop, Layout, Drawer } from 'antd'
import GlobalStorage from '../stores/global.store';
import { Header } from '../components';
import { observer } from 'mobx-react';

import './PrimaryLayout.scss'

const { Content } = Layout

@observer
class PrimaryLayout extends Component {
  constructor(props) {
      super(props);
      this.GlobalStorage = GlobalStorage;
  }



  render() {
    const { children } = this.props
    const { language, localeProviderLanguages, catalog, defaultLanguage } = this.GlobalStorage;
    console.log(language)

    return (
      <ConfigProvider locale={localeProviderLanguages[language]}>
        <I18nProvider language={language} catalogs={catalog}>
          <Fragment><Layout>
                <Header />
                    <Content
                      className="main-content"
                    >
                        {children}
                    </Content>
                    <BackTop
                    />
          </Layout></Fragment>
        </I18nProvider>
      </ConfigProvider>
    )
  }
}

export default PrimaryLayout
