import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Sidekick from './Sidekick'
import StoreProvider from './services/store'

console.log(
  '%cBuilt With Love.',
  'font-weight: bold; font-size: 20px;color: blue; text-shadow: 3px 3px 0 rgb(217,31,38)'
)

console.log('location.pathname', window.location.pathname)

ReactDOM.render(
  <StoreProvider>
    {window.location.pathname === '/sidekick' ? <Sidekick /> : <App />}
  </StoreProvider>,
  document.getElementById('root')
)
