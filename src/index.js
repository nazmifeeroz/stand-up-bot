import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AppContext from './components/context'

const Main => (
  <AppContext.provider>
    <App />
  </AppContext.provider>
)

ReactDOM.render(<App />, document.getElementById('root'))
