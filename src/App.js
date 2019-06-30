import React from 'react'
import './styles.css'
import InputSection from './components/input-section'
import publishStandup from './utils/publish-standup'
import { AppContext } from './utils/context'

const App = () => {
  const store = React.useContext(AppContext)
  return (
    <div className="container">
      <h4>Stand Up Bot</h4>
      <div className="card">
        <div className="card-content">
          <InputSection
            type="sharing"
            description="What are your thoughts?.."
          />
          <InputSection type="help" description="Anyone need help?..." />
          <InputSection type="pairing" description="Pairing Config..." />
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
        Build with <span className="red-text">&hearts;</span> by Nazmi{' '}
        <span className="right">
          &copy; <a href="https://siliconjungles.io">Silicon Jungles</a>{' '}
          {new Date().getFullYear()}
        </span>
      </blockquote>
    </div>
  )
}

export default App
