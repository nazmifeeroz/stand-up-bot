import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AppContext from './utils/context'

export const AppContextValues = () => {
  const [sharing, setSharing] = React.useState([])
  const [help, setHelp] = React.useState([])
  const [pairing, setPairing] = React.useState([])

  return {
    sharing: [sharing, setSharing],
    help: [help, setHelp],
    pairing: [pairing, setPairing],
  }
}

const Main = () => (
  <AppContext.Provider value={AppContextValues()}>
    <App />
  </AppContext.Provider>
)

ReactDOM.render(<Main />, document.getElementById('root'))
