import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { ConnectedRouter } from 'connected-react-router'
import GlobalCssStyles from '../js/utils/GlobalCssStyles'
import { initializeDep } from '../js/utils/init'
import { createReduxStore, history } from '../js/store'

const store = createReduxStore()
initializeDep()

window.store = store
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
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