import React from 'react'
import {motion} from 'framer-motion'
import styled from 'styled-components'
// import {StoreContext} from '../services/store'
import LogoBox from './LogoBox'

const PromptStartSession = ({send}) => {
  return (
    <CenterContainer
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 2}}
      exit={{opacity: 0}}
    >
      <LogoBox>
        <button
          onClick={() => send('START_SESSION')}
          className="waves-effect waves-light btn"
        >
          Start Standup Session
        </button>
      </LogoBox>
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

export default PromptStartSession
