import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <StyledBlockquote>
      <div>
        Built with <span className="red-text">&hearts;</span> by{' '}
        <a href="https://github.com/nazmifeeroz" tabIndex="-1">
          Nazmi
        </a>
      </div>
      <div>
        <span>
          &copy;{' '}
          <a href="https://siliconjungles.io" tabIndex="-1">
            Silicon Jungles
          </a>{' '}
          {new Date().getFullYear()} &middot; v1.0
        </span>
      </div>
    </StyledBlockquote>
  )
}

const StyledBlockquote = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
  @media only screen and (min-width: 600px) {
    padding: 0 15%;
  }
`

export default Footer
