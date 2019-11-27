import React, { useEffect } from 'react'
import 'materialize-css/dist/css/materialize.min.css'

import { motion } from 'framer-motion'
import styled from 'styled-components'

import './styles.css'
import InputSection from './components/input-section'
import PollSection from './components/poll-section'
import { doPublishStandup, useMutationReducer } from './services/utils'
import { StoreContext } from './services/store'
import Vim from './assets/vim-icon.png'

const CenterContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Main = () => {
  const store = React.useContext(StoreContext)
  const { vimMode, setVimMode, activeSession } = store
  const { mutation } = useMutationReducer('session')
  useEffect(() => {
    window.M.AutoInit()
  }, [])

  const doStartSession = async () => {
    const token = localStorage.getItem('token')
    mutation.insert({ variables: { token } }).then(resp => {
      localStorage.setItem(
        'session_id',
        resp.data.insert_sessions.returning[0].id
      )
    })
  }

  if (!activeSession || activeSession.length === 0)
    return (
      <CenterContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        exit={{ opacity: 0 }}
      >
        <button
          onClick={doStartSession}
          className="waves-effect waves-light btn-large"
        >
          Start Standup Session
        </button>
      </CenterContainer>
    )

  const handleChangeName = e => {
    const input = window.prompt('State your name...')
    store.setName(input)
    localStorage.setItem('name', input)
  }

  if (!store.name || store.name === 'null') {
    handleChangeName()
  }

  return (
    <>
      <motion.div
        initial={{ y: 500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <nav>
          <div className="nav-wrapper">
            <div className="brand-logo">Stand Up Bot</div>
            <a href="!#" data-target="mobile-view" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a className="modal-trigger" href="#newPoll">
                  Create Poll
                </a>
              </li>
              <li>
                <StyledLink onClick={handleChangeName}>
                  <div>{store.name}</div>
                </StyledLink>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-view">
          <li>
            <a className="modal-trigger" href="#newPoll">
              Create Poll
            </a>
          </li>
          <li>
            <a href="!#" onClick={handleChangeName}>
              {store.name}
            </a>
          </li>
        </ul>

        <StyledBody className="row">
          <div className="card-content container">
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
            <InputSection
              type="sharing"
              description="What are your thoughts?.."
            />
            <InputSection type="help" description="Anyone need help?..." />
            <InputSection type="pairing" description="Pairing Config..." />
            <PollSection />
            <ButtonsContainer>
              <button
                onClick={() => window.open('https://gc-awards.netlify.com/')}
                className="waves-effect waves-light btn-large"
              >
                GC Lucky Draw
              </button>
              {localStorage.getItem('session_id') && (
                <div className="right-align">
                  <button
                    onClick={() => doPublishStandup(store, mutation)}
                    className="orange waves-effect waves-light btn-large"
                  >
                    Publish!
                  </button>
                </div>
              )}
            </ButtonsContainer>
          </div>
        </StyledBody>
        <StyledBlockquote>
          Built with <span className="red-text">&hearts;</span> by Nazmi
          <span className="right">
            &copy;{' '}
            <a href="https://siliconjungles.io" tabIndex="-1">
              Silicon Jungles
            </a>{' '}
            {new Date().getFullYear()} &middot; v0.8.1
          </span>
        </StyledBlockquote>
      </motion.div>
    </>
  )
}

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledBlockquote = styled.blockquote`
  padding: 0 30px;
`

const StyledBody = styled.div`
  margin-top: 20px;
`

const StyledLink = styled.a`
  display: flex;
  flex-direction: column;
`

export default Main
