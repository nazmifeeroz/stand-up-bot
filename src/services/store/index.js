import React, {useEffect} from 'react'
import {assign} from 'xstate'
import {useMachine} from '@xstate/react'
import {useLazyQuery} from '@apollo/react-hooks'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import {GET_ACTIVE_SESSION, GET_ALL_QUERIES} from '../graphql/queries'
import {
  NEW_SESSION,
  NEW_SHARE,
  NEW_HELP,
  NEW_PAIR,
} from '../graphql/subscriptions'
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
  const {mutation: helpMutation} = useMutationReducer('help')
  const {mutation: pairingMutation} = useMutationReducer('pairing')

  const [current, send] = useMachine(
    storeMachine.withConfig({
      actions: {
        publishSession: ctx => {
          const sharingData = ctx.sharing.map(s => s.sharing)
          const helpData = ctx.assistance.map(a => a.assist)
          const pairingData = ctx.pairs.map(p => p.project)

          const authenticate = window.confirm(
            'You are about to publish an awesome stand up! Are you sure?',
          )

          if (!authenticate) return

          const date = new Date()
          const today = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`
          const shareText =
            sharingData[0].length > 0 ? sharingData.join('\n - ') : ''
          const helpText =
            helpData.length > 0 ? helpData.join('\n - ') : '*NO HELP NEEDED...*'
          const pairText =
            pairingData.length > 0 ? pairingData.join('\n - ') : ''
          const content = `
  ***__Stand Up__** (*${today}*)*

  **_Singapore CoronaVirus Information_**
  Cases: ${ctx.sgStats.cases}
  Yesterday: ${ctx.sgStats.yesterdayCases} | Active: ${ctx.sgStats.active}
  Deaths: ${ctx.sgStats.deaths} | Recovered: ${ctx.sgStats.recovered} | Critical: ${ctx.sgStats.critical}

  **_Global CoronaVirus Information_**
  Cases: ${ctx.globalStats.cases} | Deaths: ${ctx.globalStats.deaths} | Recovered: ${ctx.globalStats.recovered}

  **_Sharing_**\n - ${shareText}

  **_Need Help_**\n - ${helpText}

  **_Pairing_**\n - ${pairText}

  `

          console.log('content', content)

          sessionMutation
            .update({
              variables: {
                id: ctx.activeSession.id,
                content,
                status: 'COMPLETED',
                active: false,
              },
            })
            .then(() => {
              window.M.toast({html: 'Stand up published! Have a good day!'})
            })
            .catch(err => console.log('err', err))
        },
        updateEditedItem: assign((ctx, e) => {
          if (ctx.editableValue === '') return

          if (e.title === 'sharing')
            sharingMutation.update({
              variables: {id: ctx.editableItem, editedItem: ctx.editableValue},
            })

          if (e.title === 'help')
            helpMutation.update({
              variables: {id: ctx.editableItem, editedItem: ctx.editableValue},
            })

          if (e.title === 'pairing')
            pairingMutation.update({
              variables: {id: ctx.editableItem, editedItem: ctx.editableValue},
            })

          return {
            editableItem: null,
            editableValue: null,
          }
        }),
        deleteItem: assign((ctx, e) => {
          if (window.confirm('Are you sure you wish to delete?')) {
            if (e.title === 'sharing')
              sharingMutation.delete({
                variables: {
                  id: e.id,
                },
              })

            if (e.title === 'help')
              helpMutation.delete({
                variables: {
                  id: e.id,
                },
              })

            if (e.title === 'pairing')
              pairingMutation.delete({
                variables: {
                  id: e.id,
                },
              })
          }
        }),
        addNewInput: assign((ctx, e) => {
          if (e.title === 'sharing')
            sharingMutation.insert({
              variables: {
                input: ctx.inputValues[e.title],
                contributor: ctx.username,
              },
            })

          if (e.title === 'help')
            helpMutation.insert({
              variables: {
                input: ctx.inputValues[e.title],
              },
            })

          if (e.title === 'pairing')
            pairingMutation.insert({
              variables: {
                input: ctx.inputValues[e.title],
              },
            })

          return {
            inputValues: {
              ...ctx.inputValues,
              [e.title]: '',
            },
          }
        }),
        getQueriesData: ctx => {
          const parselastpublish = dayjs(ctx.lastSession.published_at)
          const aWeekAgo = dayjs().utc().subtract(5, 'day').toISOString()
          getQueriesData({
            variables: {last_published: parselastpublish, a_week_ago: aWeekAgo},
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
        startSession: () => {
          const devMode = JSON.parse(localStorage.getItem('devMode'))
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
      send('HAS_ERROR', {error: activeSessionError.message})
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

      const aWeekAgo = dayjs().utc().subtract(5, 'day').toISOString()
      queriesSubscribe({
        document: NEW_SHARE,
        variables: {lastPublishedAt: parselastpublish},
        updateQuery: (prev, {subscriptionData}) => {
          return Object.assign({}, prev, {
            sharing: subscriptionData.data.shares,
          })
        },
      })
      queriesSubscribe({
        document: NEW_HELP,
        variables: {lastPublishedAt: parselastpublish},
        updateQuery: (prev, {subscriptionData}) => {
          return Object.assign({}, prev, {
            assistance: subscriptionData.data.assistance,
          })
        },
      })
      queriesSubscribe({
        document: NEW_PAIR,
        variables: {a_week_ago: aWeekAgo},
        updateQuery: (prev, {subscriptionData}) => {
          return Object.assign({}, prev, {
            pairs: subscriptionData.data.pairs,
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
