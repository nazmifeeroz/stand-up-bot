import React from 'react'
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'

import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'

import './styles.css'
import InputSection from './components/input-section'
import { publishStandup, fetchFromDiscord } from './services/utils'
import { StoreContext } from './services/store'
import Vim from './assets/vim-icon.png'

const createApolloClient = authToken => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://sj-stand-up-bot.herokuapp.com/v1/graphql',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    cache: new InMemoryCache(),
  })
}

const App = ({ auth }) => {
  const client = createApolloClient(auth.idToken)
  const modalRef = React.useRef(null)
  let instance
  React.useEffect(() => {
    window.addEventListener('beforeunload', ev => {
      ev.preventDefault()
      return (ev.returnValue = 'Prevent manual reload')
    })
    M.Modal.init(modalRef, {
      onOpenStart: () => {
        console.log('Open Start')
      },
      onOpenEnd: () => {
        console.log('Open end')
      },
      onCloseStart: () => {
        console.log('close start')
      },
      onCloseEnd: () => {
        console.log('close end')
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: '4%',
      endingTop: '10%',
    })
  }, [])
  instance = M.Modal.getInstance(modalRef.current)
  const store = React.useContext(StoreContext)
  const { vimMode, setVimMode } = store

  return (
    <ApolloProvider client={client}>
      <div className="container">
        <a
          className="waves-effect waves-light btn modal-trigger"
          data-target="modal1"
          href="/#"
          onClick={() => {
            // modalRef.current.open()
            instance.open()
            console.log('modalRef.current', modalRef.current)
          }}
        >
          Modal
        </a>

        <div id="modal1" className="modal" ref={modalRef}>
          <div className="modal-content">
            <h4>Modal Header</h4>
            <p>A bunch of text</p>
          </div>
          <div className="modal-footer">
            <a
              href="#!"
              className="modal-close waves-effect waves-green btn-flat"
            >
              Agree
            </a>
          </div>
        </div>
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

export default App
