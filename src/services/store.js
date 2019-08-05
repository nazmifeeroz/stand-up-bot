import React from 'react'
import { Redirect } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import { ALL_SHARES, ALL_PAIRS, ALL_HELPS } from './graphql/queries'
import { NEW_SHARE, NEW_HELP } from './graphql/subscriptions'

export const StoreContext = React.createContext(null)

const StoreProvider = props => {
  const {
    authToken,
    children,
    helpsQuery,
    pairsQuery,
    setAuthToken,
    sharesQuery,
  } = props

  const [sharing, setSharing] = React.useState([])
  const [help, setHelp] = React.useState([])
  const [pairing, setPairing] = React.useState([])
  const [vimMode, setVimMode] = React.useState(false)

  React.useEffect(() => {
    if (sharesQuery.shares) {
      const shares = sharesQuery.shares.map(s => s.sharing)
      setSharing(shares)

      sharesQuery.subscribeToMore({
        document: NEW_SHARE,
        updateQuery: (prev, { subscriptionData }) => {
          if (
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
    if (helpsQuery.assistance) {
      const assistance = helpsQuery.assistance.map(a => a.assist)
      setHelp(assistance)
      helpsQuery.subscribeToMore({
        document: NEW_HELP,
        updateQuery: (prev, { subscriptionData }) => {
          if (
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
    if (pairsQuery.pairs) {
      const pairs = pairsQuery.pairs.map(p => {
        const pair = p.pair.reduce((acc, val) => `${acc} & ${val}`, '')
        return `${pair.substr(2)} - ${p.project}`
      })
      setPairing(pairs)
    }
  }, [sharesQuery, helpsQuery, pairsQuery])

  if (sharesQuery.loading || helpsQuery.loading || pairsQuery.loading)
    return <div>loading...</div>
  if (sharesQuery.error || helpsQuery.error || pairsQuery.error) {
    return <Redirect to="/login" />
  }

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

export default compose(
  graphql(ALL_SHARES, { name: 'sharesQuery' }),
  graphql(ALL_PAIRS, { name: 'pairsQuery' }),
  graphql(ALL_HELPS, { name: 'helpsQuery' })
)(StoreProvider)
