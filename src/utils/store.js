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
  'Vincent',
  'Zek',
]

export default ({ children }) => {
  const [sharing, setSharing] = React.useState([])
  const [help, setHelp] = React.useState([])
  const [pairing, setPairing] = React.useState(initialPairs)

  const value = {
    sharing: [sharing, setSharing],
    help: [help, setHelp],
    pairing: [pairing, setPairing],
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
