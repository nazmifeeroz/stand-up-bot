import React from 'react'
import {motion} from 'framer-motion'
import styled from 'styled-components'
import MoonLoader from 'react-spinners/MoonLoader'
import LogoBox from './LogoBox'

const PromptStartSession = ({isSessionStarting, send}) => {
  return (
    <CenterContainer
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 2}}
      exit={{opacity: 0}}
    >
      <LogoBox>
        <SessionButton onClick={() => send('START_SESSION')}>
          {isSessionStarting ? (
            <MoonLoader size={20} color={'#fff'} />
          ) : (
            'Start Standup Session'
          )}
        </SessionButton>
      </LogoBox>
    </CenterContainer>
  )
}

const SessionButton = styled.button.attrs({
  className: 'waves-effect waves-light btn',
})`
  display: flex !important;
  align-items: center;
  min-width: 16em;
  justify-content: center;
`

const CenterContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export default PromptStartSession
