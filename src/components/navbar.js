import React from 'react'
import styled from 'styled-components'
import { StoreContext } from '../services/store'

const Navbar = () => {
  const store = React.useContext(StoreContext)

  const handleChangeName = e => {
    const input = window.prompt('State your name...')
    store.setName(input)
    localStorage.setItem('name', input)
  }

  return (
    <>
      <StyledNav>
        <div className="nav-wrapper">
          <StyledBrandLogo>Stand Up Bot</StyledBrandLogo>
          <a href="!#" data-target="mobile-view" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a className="modal-trigger" href="#newPoll">
                History
              </a>
            </li>
            <li>
              <a className="modal-trigger" href="#newPoll">
                Create Poll
              </a>
            </li>
            <li>
              <StyledLink onClick={handleChangeName}>
                <div>{store.name}</div>
              </StyledLink>
            </li>
          </ul>
        </div>
      </StyledNav>

      <ul className="sidenav" id="mobile-view">
        <li>
          <a className="modal-trigger" href="#newPoll">
            History
          </a>
        </li>
        <li>
          <a className="modal-trigger" href="#newPoll">
            Create Poll
          </a>
        </li>
        <li>
          <a href="!#" onClick={handleChangeName}>
            {store.name}
          </a>
        </li>
      </ul>
    </>
  )
}

const StyledLink = styled.a`
  display: flex;
  flex-direction: column;
`

const StyledBrandLogo = styled.div.attrs({
  className: 'brand-logo',
})`
  @media only screen and (max-width: 600px) {
    display: none !important;
  }
`

const StyledNav = styled.nav`
  @media only screen and (min-width: 600px) {
    padding: 0 15%;
  }
`

export default Navbar
