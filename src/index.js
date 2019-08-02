import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloProvider } from 'react-apollo'

import App from './App'
import Sidekick from './Sidekick'
import StoreProvider from './services/store'

console.log(
  '%cBuilt With Love.',
  'font-weight: bold; font-size: 20px;color: blue; text-shadow: 3px 3px 0 rgb(217,31,38)'
)

const createApolloClient = authToken => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: process.env.REACT_APP_HASURA_URL,
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      },
    }),
    cache: new InMemoryCache(),
  })
}

const Callback = props => {
  const hash = props.location.hash.substr(1)

  const { id_token: token } = hash.split('&').reduce(function(result, item) {
    const parts = item.split('=')
    result[parts[0]] = parts[1]
    return result
  }, {})

  localStorage.setItem('token', token)

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

const login = () => {
  window.location.href = process.env.REACT_APP_AUTH0_URL
  return null
}

const client = createApolloClient('dummmy') // TODO

ReactDOM.render(
  <StoreProvider>
    <ApolloProvider client={client}>
      <Router>
        <Route path="/" exact component={App} />
        <Route path="/callback" exact component={Callback} />
        <Route path="/sidekick" exact component={Sidekick} />
        <Route path="/login" exact component={login} />
      </Router>
    </ApolloProvider>
  </StoreProvider>,
  document.getElementById('root')
)
