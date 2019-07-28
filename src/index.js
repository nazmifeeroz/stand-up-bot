import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import App from './App'
import Sidekick from './Sidekick'
import StoreProvider from './services/store'

console.log(
  '%cBuilt With Love.',
  'font-weight: bold; font-size: 20px;color: blue; text-shadow: 3px 3px 0 rgb(217,31,38)'
)

const insertAuth = () => {
  console.log('here in insert auth')
  const token = '141359-24u24'

  return (
    <Redirect
      to={{
        pathname: '/',
        state: {
          token,
        },
      }}
    />
  )
}

ReactDOM.render(
  <StoreProvider>
    <Router>
      <Route path="/" exact component={App} />
      <Route path="/callback" exact component={insertAuth} />
      <Route path="/sidekick" exact component={Sidekick} />
    </Router>
  </StoreProvider>,
  document.getElementById('root')
)
