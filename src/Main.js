import React, { useEffect } from 'react'
import 'materialize-css/dist/css/materialize.min.css'

import { motion } from 'framer-motion'
import styled, { createGlobalStyle, css } from 'styled-components'

import './styles.css'
import InputSection from './components/input-section'
import PollSection from './components/poll-section'
import Navbar from './components/navbar'
import { doPublishStandup, useMutationReducer } from './services/utils'
import useCovidStats from './services/useCovidStats'
import { StoreContext } from './services/store'

const CenterContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GlobalStyles = createGlobalStyle`
${props =>
  props.dark &&
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

const Main = () => {
  const store = React.useContext(StoreContext)
  const { activeSession } = store
  const { mutation } = useMutationReducer('session')
  const { stats, globalStats, loading } = useCovidStats()

  const [darkMode, setDarkMode] = React.useState(true)

  useEffect(() => {
    window.M.AutoInit()
  }, [])

  const doStartSession = async () => {
    const token = localStorage.getItem('token')
    mutation.insert({ variables: { token } }).then(resp => {
      localStorage.setItem(
        'session_id',
        resp.data.insert_sessions.returning[0].id,
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

  if (loading) return null

  return (
    <>
      <motion.div
        initial={{ y: 500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <GlobalStyles dark={darkMode} />
        <Navbar />

        <StyledBody className="row">
          <div className="card-content container">
            <CovidWrapper>
              <div>
                <b>Singapore Covid Information</b>
                <br />
                Cases: {stats.cases} | Today: {stats.todayCases} <br />
                Yesterday: {stats.yesterdayCases} | Active: {stats.active}
                <br />
                Deaths: {stats.deaths} | Recovered: {stats.recovered} |
                Critical: {stats.critical}
              </div>
              <br />
              <div>
                <b>Global Covid Information</b>
                <br />
                Cases: {globalStats.cases} | Deaths: {globalStats.deaths} |
                Recovered: {globalStats.recovered}
              </div>
            </CovidWrapper>
            <div className="switch valign-wrapper right">
              <label>
                Dark Mode
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <span className="lever" />
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
                    onClick={() =>
                      doPublishStandup(store, mutation, stats, globalStats)
                    }
                    className="orange waves-effect waves-light btn-large"
                  >
                    Publish!
                  </button>
                </div>
              )}
            </ButtonsContainer>
          </div>
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
        </StyledBody>
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

const CovidWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export default Main
