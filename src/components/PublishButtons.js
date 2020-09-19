import React from 'react'
import styled from 'styled-components'

const PublishButtons = ({sessionId, send}) => {
  return (
    <ButtonsContainer>
      <button
        onClick={() => send('REDIRECT_LUCKY_DRAW')}
        className="waves-effect waves-light btn-large"
      >
        Lucky Spin
      </button>
      <div className="right-align">
        <button
          // onClick={() =>
          //   // doPublishStandup(store, mutation, stats, globalStats)
          // }
          className="orange waves-effect waves-light btn-large"
        >
          Publish!
        </button>
      </div>
    </ButtonsContainer>
  )
}

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export default PublishButtons
