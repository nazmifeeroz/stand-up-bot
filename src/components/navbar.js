import React from 'react'
import styled from 'styled-components'
import { StoreContext } from '../services/store'
import { ReactComponent as SJLogo } from '../assets/sj-logo.svg'

const Navbar = ({ darkMode, setDarkMode }) => {
  const store = React.useContext(StoreContext)

  const handleChangeName = e => {
    const input = window.prompt('State your name...')
    store.setName(input)
    localStorage.setItem('name', input)
  }

  return (
    <StyledNav>
      <div>
        <SJLogo width={200} />
      </div>
      <StyledUL className="hide-on-med-and-down">
        <div className="switch valign-wrapper right">
          <label>
            Dark Mode
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="lever" />
          </label>
        </div>
        <div>
          <StyledLink onClick={handleChangeName}>{store.name}</StyledLink>
        </div>
      </StyledUL>
    </StyledNav>
  )
}

const StyledLink = styled.a.attrs({
  className: 'waves-effect waves-light btn',
})`
  display: flex;
  flex-direction: column;
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
`

export default Navbar
