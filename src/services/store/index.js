import React, {useEffect} from 'react'
import {assign} from 'xstate'
import {useMachine} from '@xstate/react'
import {useLazyQuery} from '@apollo/react-hooks'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import {GET_ACTIVE_SESSION, GET_ALL_QUERIES} from '../graphql/queries'
import {NEW_SESSION, NEW_SHARE} from '../graphql/subscriptions'
import {useMutationReducer} from '../utils'
import storeMachine from './chart'

export const StoreContext = React.createContext(null)

const StoreProvider = ({children}) => {
  const [
    getLastSession,
    {
      data: sessionsData,
      error: activeSessionError,
      subscribeToMore: sessionSubscribe,
    },
  ] = useLazyQuery(GET_ACTIVE_SESSION)
  dayjs.extend(utc).utc().toISOString()
  const [
    getQueriesData,
    {
      data: queriesData,
      error: queriesDataError,
      subscribeToMore: queriesSubscribe,
    },
  ] = useLazyQuery(GET_ALL_QUERIES)

  const token = localStorage.getItem('token')

  const {mutation: sessionMutation} = useMutationReducer('session')
  const {mutation: sharingMutation} = useMutationReducer('sharing')

  const [current, send] = useMachine(
    storeMachine.withConfig({
      actions: {
        addNewInput: (ctx, e) => {
          console.log('e in addinput', e)
          sharingMutation.insert({
            variables: {
              input: ctx.inputValues[e.title],
              contributor: 'some guy',
            },
          })
        },
        getQueriesData: ctx => {
          const parselastpublish = dayjs(ctx.lastSession.published_at)
          getQueriesData({
            variables: {last_published: parselastpublish},
          })
        },
        getLastSession,
        routeToLogin: () => {
          window.location.href = process.env.REACT_APP_AUTH0_URL
        },
        loadLastSessionDataAction: assign((_ctx, e) => {
          return {...e}
        }),
        loadQueriesData: assign((_ctx, {queries}) => {
          return {...queries}
        }),
        startSession: ({devMode}) => {
          sessionMutation.insert({variables: {token, devMode}}).then(resp => {
            localStorage.setItem(
              'session_id',
              resp.data.insert_sessions.returning[0].id,
            )
          })
        },
        toggleDevMode: assign(({devMode}) => {
          if (!devMode) {
            const intention = window.prompt('State your intention.')
            if (intention === process.env.REACT_APP_INTENTION)
              return {devMode: true}
            return alert('You may not enter...')
          }
          return {devMode: false}
        }),
      },
    }),
  )

  useEffect(() => {
    if (activeSessionError) {
      send('HAS_ERROR')
    }

    if (sessionsData) {
      send('LOAD_SESSION_DATA', {
        activeSession: sessionsData.sessions[0],
        lastSession: sessionsData.lastSession[0],
      })
      sessionSubscribe({
        document: NEW_SESSION,
        updateQuery: (prev, {subscriptionData}) => {
          if (
            (prev.sessions.length === 0 &&
              subscriptionData.data.sessions.length === 0) ||
            (prev.sessions.length !== 0 &&
              subscriptionData.data.sessions.length !== 0 &&
              subscriptionData.data.sessions[0].id === prev.sessions[0].id)
          )
            return prev

          return Object.assign({}, prev, {
            sessions: subscriptionData.data.sessions,
          })
        },
      })
    }
  }, [activeSessionError, sessionsData, sessionSubscribe, send])

  useEffect(() => {
    if (queriesDataError) {
      send('HAS_ERROR')
    }

    if (queriesData) {
      send('LOAD_QUERIES_DATA', {
        queries: queriesData,
      })

      const parselastpublish = dayjs(current.context.lastSession.published_at)
        .utc()
        .toISOString()

      queriesSubscribe({
        document: NEW_SHARE,
        variables: {lastPublishedAt: parselastpublish},
        updateQuery: (prev, {subscriptionData}) => {
          return Object.assign({}, prev, {
            sharing: subscriptionData.data.shares,
          })
        },
      })
    }
  }, [
    queriesDataError,
    queriesData,
    send,
    queriesSubscribe,
    current.context.lastSession,
  ])

  return (
    <StoreContext.Provider value={{current, send}}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
