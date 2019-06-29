import React from 'react'
import './styles.css'
import Category from './components/category'
import AppContext from './utils/context'
// import PairConfig from './components/pairing'

function App(props) {
  const context = React.useContext(AppContext)
  console.log('context', context)

  return (
    <div className="container">
      <h4>Stand Up Bot</h4>
      <div className="card">
        <div className="card-content">
          <Category type="sharing" description="What are your thoughts?.." />
          <Category type="help" description="Anyone need help?..." />
          {/* <PairConfig /> */}
        </div>
      </div>
      {/* <div className="right-align">
        <button
          onClick={handlePublish}
          className="orange waves-effect waves-light btn-large"
        >
          Publish!
        </button>
      </div> */}
      <blockquote>
        Build with <span className="red-text">&hearts;</span> by Nazmi{' '}
        <span className="right">
          &copy; <a href="https://siliconjungles.io">Silicon Jungles</a> 2019
        </span>
      </blockquote>
    </div>
  )
}

export default App
