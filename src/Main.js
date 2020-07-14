import React, {useEffect, useState} from 'react'
import 'materialize-css/dist/css/materialize.min.css'

import {motion} from 'framer-motion'
import styled from 'styled-components'
import CircleLoader from 'react-spinners/CircleLoader'

import './styles.css'
import InputSection from './components/input-section'
import PollSection from './components/poll-section'
import Navbar from './components/navbar'
import {doPublishStandup, useMutationReducer} from './services/utils'
import useCovidStats from './services/useCovidStats'
import {StoreContext} from './services/store'

const CenterContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Switch = styled.div`
  margin-top: 20px;
`

const Main = () => {
  const store = React.useContext(StoreContext)
  const {activeSession} = store
  const {mutation} = useMutationReducer('session')
  const {stats, globalStats, loading} = useCovidStats()
  const [devMode, setDevMode] = useState(false)

  useEffect(() => {
    window.M.AutoInit()
  }, [])

  const doStartSession = async () => {
    const token = localStorage.getItem('token')
    mutation.insert({variables: {token, devMode}}).then(resp => {
      localStorage.setItem(
        'session_id',
        resp.data.insert_sessions.returning[0].id,
      )
    })
  }

  const handleDevMode = mode => {
    if (mode) {
      const intention = window.prompt('State your intention.')
      if (intention === process.env.REACT_APP_INTENTION) return setDevMode(true)
      return alert('You may not enter...')
    }
  }

  if (!activeSession || activeSession.length === 0)
    return (
      <CenterContainer
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 2}}
        exit={{opacity: 0}}
      >
        <button
          onClick={doStartSession}
          className="waves-effect waves-light btn-large"
        >
          Start Standup Session
        </button>
        <Switch className="switch valign-wrapper right">
          <label>
            Dev Mode
            <input
              type="checkbox"
              checked={devMode}
              onChange={() => handleDevMode(!devMode)}
            />
            <span className="lever" />
          </label>
        </Switch>
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

  if (loading)
    return (
      <SpinnerWrapper
        key="spinner"
        initial={{scale: 0}}
        animate={{scale: 1}}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        exit={{scale: 0, opacity: 0}}
      >
        <CircleLoader color={'#36D7B7'} />
        <div>&nbsp; Retrieving Covid Stats...</div>
      </SpinnerWrapper>
    )

  return (
    <>
      <motion.div
        initial={{y: 500, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 1}}
      >
        <Navbar setDarkMode={store.setDarkMode} darkMode={store.darkMode} />

        <StyledBody className="row">
          <div className="card-content container">
            <CovidWrapper>
              <StyledStatsBlock>
                <b>Singapore Covid Information</b>
                <br />
                Total Cases: {stats.cases} <br />
                Yesterday: {stats.yesterdayCases} | Active: {stats.active}
                <br />
                Deaths: {stats.deaths} | Recovered: {stats.recovered} |
                Critical: {stats.critical}
              </StyledStatsBlock>
              <StyledStatsBlock>
                <b>Global Covid Information</b>
                <br />
                Cases: {globalStats.cases} | Deaths: {globalStats.deaths} |
                Recovered: {globalStats.recovered}
              </StyledStatsBlock>
            </CovidWrapper>
            <InputSection
              type="sharing"
              description="What are your thoughts?.."
            />
            <InputSection type="help" description="Anyone need help?..." />
            <InputSection type="pairing" description="Pairing Config..." />
            <PollSection />
            <ButtonsContainer>
              <button
                onClick={() =>
                  window.open(
                    `https://gc-awards.netlify.app/?token=${localStorage.getItem(
                      'token',
                    )}`,
                  )
                }
                className="waves-effect waves-light btn-large"
              >
                Lucky Spin
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
            <div>
              Built with <span className="red-text">&hearts;</span> by Nazmi
            </div>
            <div>
              <span>
                &copy;{' '}
                <a href="https://siliconjungles.io" tabIndex="-1">
                  Silicon Jungles
                </a>{' '}
                {new Date().getFullYear()} &middot; v0.95
              </span>
            </div>
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

const StyledBlockquote = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
  @media only screen and (min-width: 600px) {
    padding: 0 15%;
  }
`

const StyledBody = styled.div`
  margin-top: 20px;
`

const CovidWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`

const SpinnerWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledStatsBlock = styled.div`
  margin-bottom: 10px;
`

export default Main
