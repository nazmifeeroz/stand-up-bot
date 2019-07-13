import React from 'react'
import './styles.css'
import InputSection from './components/input-section'
import publishStandup from './utils/publish-standup'
import { StoreContext } from './utils/store'
import Vim from './assets/vim-icon.png'

const App = () => {
  const [vimMode, setVimMode] = React.useState(false)
  React.useEffect(() => {
    window.addEventListener('beforeunload', ev => {
      ev.preventDefault()
      return (ev.returnValue = 'Prevent manual reload')
    })
  })
  const store = React.useContext(StoreContext)

  return (
    <div className="container">
      <h4>Stand Up Bot</h4>
      <div className="card">
        <div className="card-content">
          <InputSection
            vimMode={vimMode}
            type="sharing"
            description="What are your thoughts?.."
          />
          <InputSection
            vimMode={vimMode}
            type="help"
            description="Anyone need help?..."
          />
          <InputSection
            vimMode={vimMode}
            type="pairing"
            description="Pairing Config..."
          />
          <div className="right-align">
            <button
              onClick={() => publishStandup(store)}
              className="orange waves-effect waves-light btn-large"
            >
              Publish!
            </button>
          </div>
        </div>
      </div>
      <blockquote>
        Built with <span className="red-text">&hearts;</span> by Nazmi &middot;
        <a
          href="#/"
          className="waves-effect waves-teal btn-flat"
          onClick={() => setVimMode(!vimMode)}
        >
          <img
            src={Vim}
            alt="vim mode"
            width="20px"
            style={{ filter: !vimMode && 'grayscale(100%)' }}
          />
        </a>
        <span className="right">
          &copy;{' '}
          <a href="https://siliconjungles.io" tabIndex="-1">
            Silicon Jungles
          </a>{' '}
          {new Date().getFullYear()} &middot; v0.1
        </span>
      </blockquote>
    </div>
  )
}

export default App
