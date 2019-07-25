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
let auth
let route

const insertAuth = () => {
  console.log('here in insert auth')
  auth = { idToken: '141359-24u24' }
  route = '/'
}

const routeComponent = () => {
  switch (route || window.location.pathname) {
    case '/sidekick':
      return <Sidekick />
    case '/callback':
      insertAuth()
      break
    default:
      return <App auth={auth} />
  }
}

ReactDOM.render(
  <StoreProvider>{routeComponent()}</StoreProvider>,
  document.getElementById('root')
)
