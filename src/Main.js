import React from 'react'
import { Redirect } from 'react-router-dom'
import 'materialize-css/dist/css/materialize.min.css'

import { motion } from 'framer-motion'
import styled from 'styled-components'

import './styles.css'
import InputSection from './components/input-section'
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

  if (!localStorage.getItem('name')) {
    const name = window.prompt('State your name...')
    if (!name) {
      return <Redirect to="/" />
    }
    localStorage.setItem('name', name)
  }

  return (
    <motion.div
      className="container"
      initial={{ y: 500, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
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
          <InputSection
            type="sharing"
            description="What are your thoughts?.."
          />
          <InputSection type="help" description="Anyone need help?..." />
          <InputSection type="pairing" description="Pairing Config..." />
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
        </div>
      </div>
      <blockquote>
        Built with <span className="red-text">&hearts;</span> by Nazmi &middot;
        <span className="right">
          &copy;{' '}
          <a href="https://siliconjungles.io" tabIndex="-1">
            Silicon Jungles
          </a>{' '}
          {new Date().getFullYear()} &middot; v0.3
        </span>
      </blockquote>
    </motion.div>
  )
}

export default Main
