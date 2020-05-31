import React from 'react'
import styled from 'styled-components'
import { StoreContext } from '../services/store'
import { ReactComponent as SJLogo } from '../assets/sj-logo.svg'

const Navbar = () => {
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

const StyledUL = styled.ul`
  flex-direction: row;
`

export default Navbar
