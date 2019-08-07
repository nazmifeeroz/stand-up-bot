import React from 'react'
import { Redirect } from 'react-router-dom'
import { useQuery } from 'react-apollo'
import { ALL_SHARES, ALL_PAIRS, ALL_HELPS } from './graphql/queries'
import { NEW_SHARE, NEW_HELP } from './graphql/subscriptions'

export const StoreContext = React.createContext(null)

const StoreProvider = ({ authToken, children, setAuthToken }) => {
  const [sharing, setSharing] = React.useState([])
  const [help, setHelp] = React.useState([])
  const [pairing, setPairing] = React.useState([])
  const [vimMode, setVimMode] = React.useState(false)

  const sharesQuery = useQuery(ALL_SHARES)
  const helpsQuery = useQuery(ALL_HELPS)
  const pairsQuery = useQuery(ALL_PAIRS)

  React.useEffect(() => {
    if (sharesQuery.data && sharesQuery.data.shares) {
      setSharing(sharesQuery.data.shares.map(s => s.sharing))
      sharesQuery.subscribeToMore({
        document: NEW_SHARE,
        updateQuery: (prev, { subscriptionData }) => {
          if (
            subscriptionData.data.shares.length === 0 ||
            subscriptionData.data.shares.length === prev.shares.length ||
            prev.shares.slice(-1)[0].id ===
              subscriptionData.data.shares.slice(-1)[0].id
          )
            return prev

          return Object.assign({}, prev, {
            shares: [...prev.shares, subscriptionData.data.shares.slice(-1)[0]],
          })
        },
      })
    }
    if (helpsQuery.data && helpsQuery.data.assistance) {
      setHelp(helpsQuery.data.assistance.map(s => s.assist))
      helpsQuery.subscribeToMore({
        document: NEW_HELP,
        updateQuery: (prev, { subscriptionData }) => {
          if (
            subscriptionData.data.assistance.length === 0 ||
            subscriptionData.data.assistance.length ===
              prev.assistance.length ||
            prev.assistance.slice(-1)[0].id ===
              subscriptionData.data.assistance.slice(-1)[0].id
          )
            return prev

          return Object.assign({}, prev, {
            assistance: [
              ...prev.assistance,
              subscriptionData.data.assistance.slice(-1)[0],
            ],
          })
        },
      })
    }
    if (pairsQuery.data.pairs) {
      const pairs = pairsQuery.data.pairs.map(p => {
        const pair = p.pair.reduce((acc, val) => `${acc} & ${val}`, '')
        return `${pair.substr(2)} - ${p.project}`
      })
      setPairing(pairs)
    }
  }, [helpsQuery, pairsQuery, sharesQuery])

  if (sharesQuery.error || helpsQuery.error || pairsQuery.error) {
    return <Redirect to="/login" />
  }
  if (sharesQuery.loading || helpsQuery.loading || pairsQuery.loading)
    return <div>loading...</div>

  const store = {
    authToken,
    help: [help, setHelp],
    pairing: [pairing, setPairing],
    setAuthToken,
    setVimMode,
    sharing: [sharing, setSharing],
    vimMode,
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default StoreProvider
