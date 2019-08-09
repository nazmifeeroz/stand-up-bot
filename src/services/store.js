import React from 'react'

import { Redirect } from 'react-router-dom'
import { useQuery } from 'react-apollo'

import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import CircleLoader from 'react-spinners/CircleLoader'

import { ALL_SHARES, ALL_PAIRS, ALL_HELPS } from './graphql/queries'
import { NEW_SHARE, NEW_HELP, NEW_PAIR } from './graphql/subscriptions'

export const StoreContext = React.createContext(null)

const StoreProvider = ({ authToken, children, setAuthToken }) => {
  const [sharing, setSharing] = React.useState([])
  const [help, setHelp] = React.useState([])
  const [pairing, setPairing] = React.useState([])
  const [vimMode, setVimMode] = React.useState(false)

  const today = new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
  const sharesQuery = useQuery(ALL_SHARES, { variables: { today } })
  const helpsQuery = useQuery(ALL_HELPS, { variables: { today } })
  const pairsQuery = useQuery(ALL_PAIRS, { variables: { today } })

  const subscribeToMore = (state, document, attr) => {
    const getToday = new Date(new Date().setHours(0, 0, 0, 0)).toISOString()

    state.subscribeToMore({
      document,
      variables: { getToday },
      updateQuery: (prev, { subscriptionData }) => {
        if (subscriptionData.data[attr].length === 0) return prev
        const exist = prev[attr].find(
          p =>
            p.id === subscriptionData.data[attr][0].id &&
            p.updated_at === subscriptionData.data[attr][0].updated_at
        )
        if (exist) return prev

        return Object.assign({}, prev, {
          [attr]: [...prev[attr], subscriptionData.data[attr].slice(-1)[0]],
        })
      },
    })
  }

  React.useEffect(() => {
    if (sharesQuery.data && sharesQuery.data.shares) {
      setSharing(sharesQuery.data.shares.map(s => s.sharing))
      subscribeToMore(sharesQuery, NEW_SHARE, 'shares')
    }
  }, [sharesQuery])

  React.useEffect(() => {
    if (helpsQuery.data && helpsQuery.data.assistance) {
      setHelp(helpsQuery.data.assistance.map(s => s.assist))
      subscribeToMore(helpsQuery, NEW_HELP, 'assistance')
    }
  }, [helpsQuery])

  React.useEffect(() => {
    if (pairsQuery.data && pairsQuery.data.pairs) {
      setPairing(pairsQuery.data.pairs.map(s => s.project))
      subscribeToMore(pairsQuery, NEW_PAIR, 'pairs')
    }
  }, [pairsQuery])

  const SpinnerWrapper = styled(motion.div)`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `

  const store = {
    authToken,
    help: [help, setHelp],
    pairing: [pairing, setPairing],
    setAuthToken,
    setVimMode,
    sharing: [sharing, setSharing],
    vimMode,
  }

  return (
    <AnimatePresence>
      {sharesQuery.loading || helpsQuery.loading || pairsQuery.loading ? (
        <SpinnerWrapper
          key="spinner"
          initial={{ scale: 0 }}
          animate={{ rotate: 180, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <CircleLoader color={'#36D7B7'} />
        </SpinnerWrapper>
      ) : sharesQuery.error || helpsQuery.error || pairsQuery.error ? (
        <Redirect to="/login" />
      ) : (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
      )}
    </AnimatePresence>
  )
}

export default StoreProvider
