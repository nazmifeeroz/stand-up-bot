import React from 'react'
import { Redirect } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'

import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloProvider } from 'react-apollo'

import './styles.css'
import InputSection from './components/input-section'
import { publishStandup, fetchFromDiscord } from './services/utils'
import { StoreContext } from './services/store'
import Vim from './assets/vim-icon.png'

const createApolloClient = authToken => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: 'wss://sj-stand-up-bot.herokuapp.com/v1/graphql',
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

const App = props => {
  const {
    location: { state },
  } = props
  React.useEffect(() => {
    window.addEventListener('beforeunload', ev => {
      ev.preventDefault()
      return (ev.returnValue = 'Prevent manual reload')
    })
  }, [])
  const store = React.useContext(StoreContext)
  const { vimMode, setVimMode } = store
  if (!state) return <Redirect to="/callback" />
  else {
    const client = createApolloClient(state.token)

    return (
      <ApolloProvider client={client}>
        <div className="container">
          <h4>Stand Up Bot</h4>
          <div className="card">
            <div className="card-content">
              <div className="switch valign-wrapper right">
                <label>
                  <input
                    type="checkbox"
                    value="vimMode"
                    onChange={() => setVimMode(!vimMode)}
                  />
                  <span className="lever" />
                  <img
                    src={Vim}
                    alt="vim mode"
                    width="25px"
                    style={{
                      marginBottom: -10,
                      marginLeft: -10,
                      filter: !vimMode && 'grayscale(100%)',
                    }}
                  />
                </label>
              </div>
              <button
                onClick={() => fetchFromDiscord()}
                className="btn-small waves-effect waves-light right"
              >
                Fetch
                <i className="material-icons right">send</i>
              </button>
              <InputSection
                type="sharing"
                description="What are your thoughts?.."
              />
              <InputSection type="help" description="Anyone need help?..." />
              <InputSection type="pairing" description="Pairing Config..." />
              <div className="right-align">
                <button
                  onClick={() => publishStandup(store)}
                  className="orange waves-effect waves-light btn-large"
                >
                  Publish!
                </button>
              </div>
            </div>
          </div>
          <blockquote>
            Built with <span className="red-text">&hearts;</span> by Nazmi
            &middot;
            <span className="right">
              &copy;{' '}
              <a href="https://siliconjungles.io" tabIndex="-1">
                Silicon Jungles
              </a>{' '}
              {new Date().getFullYear()} &middot; v0.3
            </span>
          </blockquote>
        </div>
      </ApolloProvider>
    )
  }
}

export default App
