import React from 'react'
import styled from 'styled-components'

const DevMode = ({devMode}) => {
  if (!devMode) return null

  return <ModeBox>Dev Mode</ModeBox>
}

const ModeBox = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background: linear-gradient(to right, hsl(150 100% 40%), hsl(180 100% 59%));

  background-clip: text;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

export default DevMode
