import React from 'react'
import styled from 'styled-components'
import LogoBox from './LogoBox'
import {useMutationReducer} from '../services/utils'

const AdminPage = ({devMode, toggleDevMode}) => {
  const {mutation: sessionMutation} = useMutationReducer('session')
  const [msg, setMsg] = React.useState(null)
  const resetSession = async () => {
    const resp = await sessionMutation.delete()
    setMsg(String(resp.data.delete_sessions.affected_rows))
  }

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
        <ResetBtn href="/" className="btn-large" onClick={resetSession}>
          Reset Session
        </ResetBtn>
        <a href="/" className="orange waves-effect waves-light btn">
          Back
        </a>
      </LogoBox>
      {msg && <ErrorDiv>Affected rows: {msg}</ErrorDiv>}
    </Container>
  )
}

const ErrorDiv = styled.div`
  margin-top: 1em;
`

const ResetBtn = styled.button`
  margin-bottom: 1em;
`

const Switch = styled.div`
  margin-bottom: 1em;
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
