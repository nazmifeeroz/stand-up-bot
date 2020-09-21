import React from 'react'
import styled from 'styled-components'

const DevMode = ({devMode}) => {
  return (
    <ModeBox href="/admin">
      {devMode ? 'Dev Mode' : <i className="material-icons">settings</i>}
    </ModeBox>
  )
}

const ModeBox = styled.a`
  position: fixed;
  bottom: 0.5em;
  right: 0.5em;
  background: linear-gradient(to right, hsl(150 100% 40%), hsl(180 100% 59%));

  background-clip: text;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export default DevMode
