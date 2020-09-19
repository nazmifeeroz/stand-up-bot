import React, {useContext} from 'react'
import {motion} from 'framer-motion'
import styled from 'styled-components'
import {StoreContext} from '../services/store'

const PromptStartSession = () => {
  const {current, send} = useContext(StoreContext)

  return (
    <CenterContainer
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 2}}
      exit={{opacity: 0}}
    >
      <StyledBorder>
        <ContentBox>
          <StyledAppTitle>
            <span>Standup Bot</span>
            {/* <span>v1</span> */}
          </StyledAppTitle>
          <button
            onClick={() => send('START_SESSION')}
            className="waves-effect waves-light btn"
          >
            Start Standup Session
          </button>
        </ContentBox>
      </StyledBorder>
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

const ContentBox = styled.div`
  margin: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledBorder = styled.div`
  padding: 3px;
  border-color: transparent;
  border-radius: 8px;
  background-image: linear-gradient(#333, #333),
    linear-gradient(to right, hsl(150 100% 40%), hsl(180 100% 59%));
  background-origin: border-box;
  background-clip: content-box, border-box;
`

const StyledAppTitle = styled.div`
  font-size: 25px;
  padding: 3px;
  margin-bottom: 10px;
  color: white;

  span {
    background: linear-gradient(to right, hsl(150 100% 40%), hsl(180 100% 59%));

    background-clip: text;

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  span:nth-child(2) {
    margin: 0 1rem;
    font-size: 12px;
  }
`

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
