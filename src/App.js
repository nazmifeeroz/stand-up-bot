import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import ApolloClient from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {WebSocketLink} from 'apollo-link-ws'
import {ApolloProvider} from 'react-apollo'

import Sidekick from './Sidekick'
import Callback from './components/callback'
import Login from './components/login'
import HistoryPage from './components/history-page'

import Main from './Main'
import StoreProvider from './services/store'

const MainPage = () => {
  return (
    <StoreProvider>
      <Main />
    </StoreProvider>
  )
}

const App = () => {
  const [authToken, setAuthToken] = React.useState(
    localStorage.getItem('token')
  )
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
    <Router>
      <ApolloProvider client={createApolloClient()}>
        <Route path="/" exact component={MainPage} />
        <Route path="/history" exact component={HistoryPage} />
      </ApolloProvider>
      <Route
        path="/callback"
        exact
        render={props => <Callback {...props} setAuthToken={setAuthToken} />}
      />
      <Route path="/sidekick" exact component={Sidekick} />
      <Route path="/login" exact component={Login} />
    </Router>
  )
}

export default App
