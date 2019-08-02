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

const InsertAuth = props => {
  console.log('props in insert auth', props)
  const hash = props.location.hash.substr(1)

  const { id_token } = hash.split('&').reduce(function(result, item) {
    const parts = item.split('=')
    result[parts[0]] = parts[1]
    return result
  }, {})

  return (
    <Redirect
      to={{
        pathname: '/',
        state: {
          id_token,
        },
      }}
    />
  )
}

ReactDOM.render(
  <StoreProvider>
    <Router>
      <Route path="/" exact component={App} />
      <Route path="/callback" exact component={InsertAuth} />
      <Route path="/sidekick" exact component={Sidekick} />
    </Router>
  </StoreProvider>,
  document.getElementById('root')
)
