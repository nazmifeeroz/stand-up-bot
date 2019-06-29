import React from 'react'

export const AppContext = React.createContext(null)

export default ({ children }) => {
  const [sharing, setSharing] = React.useState([])
  const [help, setHelp] = React.useState([])
  const [pairing, setPairing] = React.useState([])

  const value = {
    sharing: [sharing, setSharing],
    help: [help, setHelp],
    pairing: [pairing, setPairing],
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
