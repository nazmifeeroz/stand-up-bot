import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import StoreProvider from './services/store'

console.log(
  '%cBuilt With Love.',
  'font-weight: bold; font-size: 20px;color: blue; text-shadow: 3px 3px 0 rgb(217,31,38)'
)

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
)
