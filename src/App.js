import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {ApolloProvider} from '@apollo/react-hooks'
import {createGlobalStyle, css} from 'styled-components'
import '@materializecss/materialize/dist/css/materialize.min.css'
import '@materializecss/materialize/dist/js/materialize.min.js'
import './styles.css'

import {createApolloClient} from './services/graphql'
import Sidekick from './Sidekick'
import Callback from './components/callback'
import Login from './components/login'
import HistoryPage from './components/history-page'

import Main from './Main'
import StoreProvider from './services/store'
import AdminPage from './components/AdminPage'
import DevMode from './components/DevMode'

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
  const [devMode, setDevMode] = React.useState(
    JSON.parse(localStorage.getItem('devMode')),
  )
  const toggleDevMode = () => {
    if (!devMode) {
      const intention = window.prompt('State your intention.')
      if (intention === process.env.REACT_APP_INTENTION) {
        localStorage.setItem('devMode', true)
        return setDevMode(true)
      }
    }
    localStorage.setItem('devMode', false)
    return setDevMode(false)
  }

  return (
    <Router>
      <GlobalStyles darkMode={true} />
      <ApolloProvider client={createApolloClient(authToken)}>
        <Route path="/" exact component={MainPage} />
        <Route path="/history" exact component={HistoryPage} />
        <Route
          path="/admin"
          exact
          component={() => (
            <AdminPage devMode={devMode} toggleDevMode={toggleDevMode} />
          )}
        />
      </ApolloProvider>
      <Route
        path="/callback"
        exact
        render={props => <Callback {...props} setAuthToken={setAuthToken} />}
      />
      <Route path="/sidekick" exact component={Sidekick} />
      <Route path="/login" exact component={Login} />
      <DevMode devMode={devMode} />
    </Router>
  )
}

const GlobalStyles = createGlobalStyle`
${props =>
  props.darkMode &&
  css`
    body {
      background-color: #333;
      color: #fff;
    }

    input {
      color: #fff;
    }

    a {
      color: #b3e5fc !important;
    }

    .collection-item {
      background-color: #455a64 !important;
    }
  `}
  `

export default App
