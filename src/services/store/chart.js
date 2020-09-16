import {assign, Machine} from 'xstate'

const USERNAME = '@username'

const storeMachine = Machine(
  {
    initial: 'verifyAuth',
    context: {darkMode: true, loadingMsg: '', devMode: false, username: ''},
    on: {
      LOAD_SESSION_DATA: {
        target: 'checkSession',
        actions: 'loadLastSessionDataAction',
      },
    },
    states: {
      verifyAuth: {
        entry: [
          'getLastSession',
          assign({loadingMsg: 'Verifying authentication...'}),
        ],
        on: {
          HAS_ERROR: {actions: 'routeToLogin'},
        },
      },
      checkSession: {
        always: [
          {
            target: 'sessionStarted',
            cond: 'checkSession',
          },
          {target: 'promptStartSession'},
        ],
      },
      promptStartSession: {
        on: {
          START_SESSION: {actions: 'startSession'},
          TOGGLE_DEV_MODE: {actions: 'toggleDevMode'},
        },
      },
      sessionStarted: {
        entry: ['getUsername', 'getQueriesData'],
        on: {
          TOGGLE_DARK_MODE: {actions: 'toggleDarkMode'},
          SET_USERNAME: {
            actions: 'setUsername',
          },
          LOAD_QUERIES_DATA: {
            actions: 'loadQueriesData',
          },
          DELETE_ITEM: {actions: 'deleteItem'},
          ON_INPUT_CHANGE: {actions: 'onInputChange'},
        },
      },
    },
  },
  {
    actions: {
      onInputChange: assign((_ctx, e) => ({
        inputValue: e.inputValue,
      })),
      toggleDarkMode: assign(ctx => ({darkMode: !ctx.darkMode})),
      getUsername: assign(() => {
        const username = localStorage.getItem(USERNAME)

        return {username}
      }),
      setUsername: assign(() => {
        const username = window.prompt('State your name...')
        localStorage.setItem(USERNAME, username)
        return {
          username,
        }
      }),
    },
    guards: {
      checkSession: ctx => !!ctx.activeSession,
    },
  },
)

export default storeMachine
