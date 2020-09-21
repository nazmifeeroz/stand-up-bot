import React from 'react'
import styled from 'styled-components'

const LogoBox = ({children, subtitle}) => {
  return (
    <StyledBorder>
      <ContentBox>
        <StyledAppTitle>
          <span>Standup Bot</span>
          <span>{subtitle}</span>
        </StyledAppTitle>
        {children}
      </ContentBox>
    </StyledBorder>
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
  min-height: 120px;
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
    display: block;
    text-align: center;
    font-size: 12px;
  }
`

export default LogoBox
