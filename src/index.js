import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import MainRoutes from './main-routers'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(MainRoutes)
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./main-routers', () => { render(MainRoutes) })
}
