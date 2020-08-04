import React from 'react'
import {motion} from 'framer-motion'
import styled from 'styled-components'

const PromptStartSession = ({current, send}) => {
  return (
    <CenterContainer
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 2}}
      exit={{opacity: 0}}
    >
      <button
        onClick={() => send('START_SESSION')}
        className="waves-effect waves-light btn-large"
      >
        Start Standup Session
      </button>
      <Switch className="switch valign-wrapper right">
        <label>
          Dev Mode
          <input
            type="checkbox"
            checked={current.context.devMode}
            onChange={() => send('TOGGLE_DEV_MODE')}
          />
          <span className="lever" />
        </label>
      </Switch>
    </CenterContainer>
  )
}

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

export default PromptStartSession
