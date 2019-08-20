import React from 'react'

import { Redirect } from 'react-router-dom'
import { useQuery } from 'react-apollo'

import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import CircleLoader from 'react-spinners/CircleLoader'

import { GET_ALL_QUERIES } from './graphql/queries'
import {
  NEW_SHARE,
  NEW_HELP,
  NEW_PAIR,
  NEW_SESSION,
} from './graphql/subscriptions'

export const StoreContext = React.createContext(null)

const StoreProvider = ({ authToken, children, setAuthToken }) => {
  const [activeSession, setActiveSession] = React.useState(null)
  const [help, setHelp] = React.useState([])
  const [pairing, setPairing] = React.useState([])
  const [sharing, setSharing] = React.useState([])
  const [vimMode, setVimMode] = React.useState(false)
  const [name, setName] = React.useState(null)

  const today = new Date(new Date().setHours(0, 0, 0, 0)).toISOString()

  const allQueries = useQuery(GET_ALL_QUERIES, { variables: { today } })

  const subscribeToMore = (state, document, attr) => {
    const getToday = new Date(new Date().setHours(0, 0, 0, 0)).toISOString()

    state.subscribeToMore({
      document,
      variables: attr !== 'sessions' && { getToday },
      updateQuery: (prev, { subscriptionData }) => {
        return Object.assign({}, prev, {
          [attr]: subscriptionData.data[attr],
        })
      },
    })
  }

  React.useEffect(() => {
    if (allQueries.data && allQueries.data.shares) {
      const reformatedData = allQueries.data.shares.map(d => {
        return { ...d, value: d.sharing }
      })
      setSharing(reformatedData)
      subscribeToMore(allQueries, NEW_SHARE, 'shares')
    }
    if (allQueries.data && allQueries.data.assistance) {
      const reformatedData = allQueries.data.assistance.map(d => {
        return { ...d, value: d.assist }
      })
      setHelp(reformatedData)
      subscribeToMore(allQueries, NEW_HELP, 'assistance')
    }
    if (allQueries.data && allQueries.data.pairs) {
      const reformatedData = allQueries.data.pairs.map(d => {
        return { ...d, value: d.project }
      })
      setPairing(reformatedData)
      subscribeToMore(allQueries, NEW_PAIR, 'pairs')
    }
    if (allQueries.data && allQueries.data.sessions) {
      setActiveSession(allQueries.data.sessions)
      subscribeToMore(allQueries, NEW_SESSION, 'sessions')
    }
  }, [allQueries, allQueries.data])

  const SpinnerWrapper = styled(motion.div)`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `

  const store = {
    activeSession,
    authToken,
    help: [help, setHelp],
    name,
    pairing: [pairing, setPairing],
    setActiveSession,
    setAuthToken,
    setName,
    setVimMode,
    sharing: [sharing, setSharing],
    vimMode,
  }

  // return null
  return (
    <AnimatePresence>
      {allQueries.loading ? (
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
      ) : allQueries.error ? (
        <Redirect to="/login" />
      ) : (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
      )}
    </AnimatePresence>
  )
}

export default StoreProvider
