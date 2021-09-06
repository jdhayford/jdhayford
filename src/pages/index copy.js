import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Main from '../js/Frames/Main'

import GlobalCssStyles from '../js/utils/GlobalCssStyles'
import { initializeDep } from '../js/utils/init'
import { createReduxStore } from '../js/store'

const store = createReduxStore()
initializeDep()

if (process.browser) window.store = store
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
        <GlobalCssStyles />
      </Provider>
    )
  }
}

// if (process.browser) {
//   ReactDOM.render(<App />, document.getElementById('root') || document.createElement('div'))
// }

if (module.hot && process.browser) {
  module.hot.accept()
  window.addEventListener('message', e => {
    if (process.env.NODE_ENV !== 'production' && e.data && e.data.type === 'webpackInvalid') {
      console.clear()
    }
  })
}

export default App