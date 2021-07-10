import React from 'react'
import Body from '../components/Body'
import Loader from '../components/Loader'
import PromptStartSession from '../components/PromptStartSession'

const MainComponent = ({current, send}) => {
  return (
    <>
      {['verifyAuth', 'checkSession', 'showErrorMsg'].some(current.matches) && (
        <Loader current={current} />
      )}
      {current.matches('promptStartSession') && (
        <PromptStartSession
          send={send}
          isSessionStarting={current.matches(
            'promptStartSession.startingSession',
          )}
        />
      )}
      {current.matches('sessionStarted') && (
        <Body current={current} send={send} />
      )}
    </>
  )
}

export default MainComponent
