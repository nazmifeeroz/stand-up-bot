import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloProvider } from 'react-apollo'

import Main from './Main'
import Sidekick from './Sidekick'
import StoreProvider from './services/store'

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'))
  const Callback = props => {
    const hash = props.location.hash.substr(1)

    const { id_token: token } = hash.split('&').reduce(function(result, item) {
      const parts = item.split('=')
      result[parts[0]] = parts[1]
      return result
    }, {})

    setAuthToken(token)
    localStorage.setItem('token', token)

    return <Redirect to="/" />
  }

  const Login = () => {
    window.location.href = process.env.REACT_APP_AUTH0_URL
    return null
  }
  const createApolloClient = () => {
    return new ApolloClient({
      link: new WebSocketLink({
        uri: process.env.REACT_APP_HASURA_URL,
        options: {
          reconnect: true,
          connectionParams: {
            headers: {
              Authorization: `Bearer ${authToken ? authToken : ''}`,
            },
          },
        },
      }),
      cache: new InMemoryCache(),
    })
  }

  return (
    <ApolloProvider client={createApolloClient()}>
      <StoreProvider>
        <Main />
        <Route path="/callback" exact component={Callback} />
        <Route path="/sidekick" exact component={Sidekick} />
        <Route path="/login" exact component={Login} />
      </StoreProvider>
    </ApolloProvider>
  )
}

export default App
