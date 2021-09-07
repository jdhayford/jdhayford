import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { initializeDep } from '../utils/init'
import { createReduxStore } from '../store'
import Header from '../Components/Header'

const store = createReduxStore()
initializeDep()

if (process.browser) window.store = store
class MainFrame extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        {this.props?.children}
      </Provider>
    )
  }
}

// if (process.browser) {
//   ReactDOM.render(<MainFrame />, document.getElementById('root') || document.createElement('div'))
// }

if (module.hot && process.browser) {
  module.hot.accept()
  window.addEventListener('message', e => {
    if (process.env.NODE_ENV !== 'production' && e.data && e.data.type === 'webpackInvalid') {
      console.clear()
    }
  })
}

export default MainFrame