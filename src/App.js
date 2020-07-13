import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {ApolloProvider} from '@apollo/react-hooks'

import {createApolloClient} from './services/graphql'
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
    localStorage.getItem('token'),
  )

  return (
    <Router>
      <ApolloProvider client={createApolloClient(authToken)}>
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
