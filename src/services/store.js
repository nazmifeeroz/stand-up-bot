import React from 'react'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { Redirect } from 'react-router-dom'
import { useQuery } from 'react-apollo'

import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import CircleLoader from 'react-spinners/CircleLoader'

import { GET_ALL_QUERIES, GET_PAIRS } from './graphql/queries'
import {
  NEW_SHARE,
  NEW_HELP,
  NEW_PAIR,
  NEW_SESSION,
} from './graphql/subscriptions'

export const StoreContext = React.createContext(null)

dayjs.extend(utc)

const today = dayjs()
  .utc()
  .toISOString()
const yesterday = dayjs()
  .utc()
  .subtract(2, 'day')
  .toISOString()

const StoreProvider = ({ authToken, children, setAuthToken }) => {
  const [activeSession, setActiveSession] = React.useState(null)
  const [help, setHelp] = React.useState([])
  const [pairing, setPairing] = React.useState([])
  const [sharing, setSharing] = React.useState([])
  const [pollsData, setPollsData] = React.useState(null)
  const [vimMode, setVimMode] = React.useState(false)
  const savedName = localStorage.getItem('name')
  const [name, setName] = React.useState(savedName)

  const allQueries = useQuery(GET_ALL_QUERIES, {
    variables: { today },
  })
  const allPairs = useQuery(GET_PAIRS, {
    variables: { yesterday },
  })

  const subscribeToMore = (state, document, attr) => {
    const getToday = new Date(new Date().setHours(0, 0, 0, 0)).toISOString()

    state.subscribeToMore({
      document,
      variables:
        attr !== 'sessions' &&
        (attr === 'pairs' ? { yesterday } : { getToday }),
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
    if (allPairs.data && allPairs.data.pairs) {
      const reformatedData = allPairs.data.pairs.map(d => {
        return { ...d, value: d.project }
      })
      setPairing(reformatedData)
      subscribeToMore(allPairs, NEW_PAIR, 'pairs')
    }
    if (allQueries.data && allQueries.data.sessions) {
      setActiveSession(allQueries.data.sessions)
      subscribeToMore(allQueries, NEW_SESSION, 'sessions')
    }
  }, [allPairs, allPairs.data, allQueries, allQueries.data])

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
    pollsData,
    setActiveSession,
    setAuthToken,
    setName,
    setPollsData,
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
