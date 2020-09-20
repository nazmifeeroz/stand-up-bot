import React from 'react'
import styled from 'styled-components'
import LogoBox from './LogoBox'

const AdminPage = ({devMode, toggleDevMode}) => {
  return (
    <Container>
      <LogoBox subtitle="Admin">
        <Switch className="switch">
          <label>
            Dev Mode
            <input type="checkbox" checked={devMode} onChange={toggleDevMode} />
            <span className="lever" />
          </label>
        </Switch>
        <a href="/" className="btn">
          Back
        </a>
      </LogoBox>
    </Container>
  )
}

const Switch = styled.div`
  margin-bottom: 20px;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export default AdminPage
