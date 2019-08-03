import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'

console.log(
  '%cBuilt With Love.',
  'font-weight: bold; font-size: 20px;color: blue; text-shadow: 3px 3px 0 rgb(217,31,38)'
)

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
