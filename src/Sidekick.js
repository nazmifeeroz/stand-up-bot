import React from 'react'
import styled from 'styled-components'
import './styles.css'

const CardContainer = styled.div``

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center !important;
`

export default () => {
  return (
    <StyledContainer className="container">
      <CardContainer className="card">
        <div className="card-content">hello</div>
      </CardContainer>
    </StyledContainer>
  )
}
