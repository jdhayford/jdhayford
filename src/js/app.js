import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'

import { ConnectedRouter } from 'connected-react-router'
import Main from './Frames/Main'
import GlobalCssStyles from './utils/GlobalCssStyles'
import { initializeDep } from './utils/init'
import { createReduxStore, history } from './store'

const store = createReduxStore()
initializeDep()

window.store = store
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Main />
        </ConnectedRouter>
        <GlobalCssStyles />
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root') || document.createElement('div'))

if (module.hot) {
  module.hot.accept()
  window.addEventListener('message', e => {
    if (process.env.NODE_ENV !== 'production' && e.data && e.data.type === 'webpackInvalid') {
      console.clear()
    }
  })
}