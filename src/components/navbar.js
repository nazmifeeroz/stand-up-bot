import React from 'react'
import styled from 'styled-components'
import {StoreContext} from '../services/store'
import {ReactComponent as SJLogo} from '../assets/sj-logo.svg'

const Navbar = () => {
  const {current, send} = React.useContext(StoreContext)

  return (
    <StyledNav>
      <div>
        <SJLogo width={200} />
      </div>
      <StyledUL>
        <div className="switch valign-wrapper right">
          <label>
            Dark Mode
            <input
              type="checkbox"
              checked={current.context.darkMode}
              onChange={() => send('TOGGLE_DARK_MODE')}
            />
            <span className="lever" />
          </label>
        </div>
        <div>
          <Username onClick={() => send('SET_USERNAME')}>
            {current.context.username}
          </Username>
        </div>
      </StyledUL>
    </StyledNav>
  )
}

const Username = styled.a.attrs({
  className: 'waves-effect waves-light btn',
})`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 600px) {
    margin-top: 10px;
  }
`

const StyledNav = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  @media only screen and (min-width: 600px) {
    padding: 0 15%;
  }
`

const StyledUL = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: space-around;
  }
`

export default Navbar
