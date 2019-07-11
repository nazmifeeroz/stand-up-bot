import React from 'react'

export const StoreContext = React.createContext(null)

const initialPairing = JSON.parse(localStorage.getItem('pairing')) || []

export default ({ children }) => {
  const [sharing, setSharing] = React.useState([])
  const [help, setHelp] = React.useState([])
  const [pairing, setPairing] = React.useState(initialPairing)

  const store = {
    sharing: [sharing, setSharing],
    help: [help, setHelp],
    pairing: [pairing, setPairing],
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
