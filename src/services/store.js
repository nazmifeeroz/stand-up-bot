import React, {useEffect} from 'react'
import {assign, Machine} from 'xstate'
import {useMachine} from '@xstate/react'
import {useLazyQuery} from '@apollo/react-hooks'
import styled, {createGlobalStyle, css} from 'styled-components'
import {motion} from 'framer-motion'
import CircleLoader from 'react-spinners/CircleLoader'
import {GET_ACTIVE_SESSION} from './graphql/queries'

export const StoreContext = React.createContext(null)

const storeMachine = Machine({
  initial: 'verifyAuth',
  context: {darkMode: true, loadingMsg: ''},
  states: {
    verifyAuth: {
      entry: [
        'getLastSession',
        assign({loadingMsg: 'Verifying authentication...'}),
      ],
      on: {
        HAS_ERROR: {actions: 'routeToLogin'},
        LOAD_SESSION_DATA: {
          target: 'checkSession',
          actions: 'loadLastSessionDataAction',
        },
      },
    },
    checkSession: {
      entry: assign({loadingMsg: 'Checking for active session...'}),
      invoke: {
        src: ctx =>
          new Promise((res, rej) => {
            console.log('!!ctx.activeSession', !!ctx.activeSession)
            if (!!ctx.activeSession) {
              console.log('return res')
              return res()
            }
            console.log('return rej')
            return rej()
          }),
        onDone: 'sessionReady',
        onError: 'promptStartSession',
      },
    },
    sessionReady: {},
    promptStartSession: {},
  },
})

const useStoreHook = () => {
  const [
    getLastSession,
    {data: activeSessionData, error: activeSessionError},
  ] = useLazyQuery(GET_ACTIVE_SESSION)

  const [current, send] = useMachine(
    storeMachine.withConfig({
      actions: {
        getLastSession,
        routeToLogin: () => {
          // window.location.href = process.env.REACT_APP_AUTH0_URL
        },
        loadLastSessionDataAction: assign((_ctx, {activeSession}) => {
          return {activeSession}
        }),
      },
    }),
  )

  useEffect(() => {
    if (activeSessionError) {
      send('HAS_ERROR')
    }

    if (activeSessionData) {
      send('LOAD_SESSION_DATA', {
        activeSession: activeSessionData.sessions[0],
      })
    }
  }, [activeSessionError, activeSessionData, send])

  return [current, send]
}

const Store = () => {
  const [current, send] = useStoreHook()
  console.log('current', current)

  return (
    <>
      <GlobalStyles darkMode={current.context.darkMode} />
      {(current.matches('verifyAuth') || current.matches('checkSession')) && (
        <SpinnerWrapper
          key="spinner"
          initial={{scale: 0}}
          animate={{scale: 1}}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <CircleLoader color={'#36D7B7'} />
          <LoadingLabel>{current.context.loadingMsg}</LoadingLabel>
        </SpinnerWrapper>
      )}
      {current.matches('promptStartSession') && <div>prompt start session</div>}
      {current.matches('sessionReady') && <div>Session ready!</div>}
    </>
  )
}

const GlobalStyles = createGlobalStyle`
${props =>
  props.darkMode &&
  css`
    body {
      background-color: #333;
      color: #fff;
    }

    input {
      color: #fff;
    }

    a {
      color: #b3e5fc !important;
    }

    .collection-item {
      background-color: #455a64 !important;
    }
  `}
  `

const SpinnerWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoadingLabel = styled.div`
  margin-left: 10px;
`

export default Store
