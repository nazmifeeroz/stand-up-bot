import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'

import { motion } from 'framer-motion'

import './styles.css'
import InputSection from './components/input-section'
import { publishStandup } from './services/utils'
import { StoreContext } from './services/store'
import Vim from './assets/vim-icon.png'

const Main = props => {
  const store = React.useContext(StoreContext)
  const { vimMode, setVimMode } = store

  return (
    <motion.div
      className="container"
      initial={{ y: 500, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h4>Stand Up Bot</h4>
      <div className="card">
        <div className="card-content">
          <div className="switch valign-wrapper right">
            <label>
              <input
                type="checkbox"
                value="vimMode"
                onChange={() => setVimMode(!vimMode)}
              />
              <span className="lever" />
              <img
                src={Vim}
                alt="vim mode"
                width="25px"
                style={{
                  marginBottom: -10,
                  marginLeft: -10,
                  filter: !vimMode && 'grayscale(100%)',
                }}
              />
            </label>
          </div>
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
        Built with <span className="red-text">&hearts;</span> by Nazmi &middot;
        <span className="right">
          &copy;{' '}
          <a href="https://siliconjungles.io" tabIndex="-1">
            Silicon Jungles
          </a>{' '}
          {new Date().getFullYear()} &middot; v0.3
        </span>
      </blockquote>
    </motion.div>
  )
}

export default Main
