import React from 'react'

export const StoreContext = React.createContext(null)

const initialPairs = [
  'Celine',
  'Jany',
  'Jarrett',
  'Jaslyn',
  'Jason',
  'Justin',
  'Nazmi',
  'Sam',
  'Thiam Hock',
  'Vincent',
  'Zek',
]

export default ({ children }) => {
  const [sharing, setSharing] = React.useState([])
  const [help, setHelp] = React.useState([])
  const [pairing, setPairing] = React.useState(initialPairs)

  const store = {
    sharing: [sharing, setSharing],
    help: [help, setHelp],
    pairing: [pairing, setPairing],
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
