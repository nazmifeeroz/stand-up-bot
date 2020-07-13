import React, {useEffect} from 'react'
import {assign, Machine} from 'xstate'
import {useMachine} from '@xstate/react'
import {useLazyQuery} from '@apollo/react-hooks'
import {
  GET_ALL_QUERIES,
  GET_PAIRS,
  GET_LAST_PUBLISHED_SESSION,
} from './graphql/queries'

export const StoreContext = React.createContext(null)

const storeMachine = Machine({
  initial: 'verifyAuth',
  states: {
    verifyAuth: {
      entry: 'getLastSession',
      on: {
        HAS_ERROR: {actions: 'routeToLogin'},
        LOAD_SESSION_DATA: {
          target: 'sessionReady',
          actions: 'loadLastSessionDataAction',
        },
      },
    },
    sessionReady: {},
  },
})

const Store = () => {
  const [
    getLastSession,
    {data: publishedSessionsData, error: publishedSessionsError},
  ] = useLazyQuery(GET_LAST_PUBLISHED_SESSION)

  const [current, send] = useMachine(
    storeMachine.withConfig({
      actions: {
        getLastSession,
        routeToLogin: () => {
          window.location.href = process.env.REACT_APP_AUTH0_URL
        },
        loadLastSessionDataAction: assign((_ctx, {lastSession}) => {
          return {lastSession}
        }),
      },
    }),
  )

  useEffect(() => {
    if (publishedSessionsError) {
      send('HAS_ERROR')
    }

    if (publishedSessionsData) {
      send('LOAD_SESSION_DATA', {
        lastSession: publishedSessionsData.sessions[0],
      })
    }
  }, [publishedSessionsError, publishedSessionsData, send])

  console.log('current', current)

  return <div></div>
}

export default Store
