import {assign, Machine} from 'xstate'

const USERNAME = '@username'

const initialLoading = {sharing: false, help: false, pairing: false}

const storeMachine = Machine(
  {
    initial: 'verifyAuth',
    context: {
      darkMode: true,
      devMode: false,
      editableItem: null,
      editableValue: null,
      loadingMsg: '',
      loading: initialLoading,
      username: '',
      inputValues: {
        sharing: '',
        help: '',
        pairing: '',
      },
    },
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
          HAS_ERROR: 'errorRoute',
        },
      },
      errorRoute: {
        entry: assign((_, e) => ({loadingMsg: e.error})),
        always: [
          {
            target: 'routeToLogin',
            cond: ctx => {
              return !ctx.loadingMsg.includes('Network error')
            },
          },
          {target: 'showErrorMsg'},
        ],
      },
      routeToLogin: {
        entry: 'routeToLogin',
      },
      showErrorMsg: {},
      checkSession: {
        always: [
          {
            target: 'checksUsername',
            cond: 'checkSession',
          },
          {target: 'promptStartSession'},
        ],
      },
      promptStartSession: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              START_SESSION: {
                target: 'startingSession',
                actions: 'startSession',
              },
              TOGGLE_DEV_MODE: {actions: 'toggleDevMode'},
            },
          },
          startingSession: {},
        },
      },
      checksUsername: {
        invoke: {
          src: () =>
            new Promise(async (res, rej) => {
              let username = localStorage.getItem(USERNAME)
              if (username && username !== 'null') return res(username)
              username = await window.prompt('State your name...')
              return rej(username)
            }),
          onDone: {
            target: 'sessionStarted',
            actions: assign((_, e) => ({username: e.data})),
          },
          onError: {
            target: 'checksUsername',
            actions: (_, e) => {
              localStorage.setItem(USERNAME, e.data)
            },
          },
        },
      },
      sessionStarted: {
        entry: 'getQueriesData',
        on: {
          CLOSE_EDIT_ITEM: {actions: 'closeEditItem'},
          DELETE_ITEM: {actions: ['deleteItem', 'startLoading']},
          EDIT_ITEM: {actions: 'editItem'},
          NEW_INPUT_PRESSED: {actions: ['addNewInput', 'startLoading']},
          ON_EDITABLE_CHANGE: {actions: 'onEditableChange'},
          ON_INPUT_CHANGE: {actions: 'onInputChange'},
          PUBLISH_STANDUP_SESSION: {actions: 'publishSession'},
          REDIRECT_LUCKY_DRAW: {actions: 'redirectLuckyDraw'},
          SAVE_COVID_STATS: {actions: 'saveCovidStats'},
          TOGGLE_DARK_MODE: {actions: 'toggleDarkMode'},
          UPDATE_EDITED_ITEM: {actions: ['updateEditedItem', 'startLoading']},
          SET_USERNAME: {
            actions: 'setUsername',
          },
          LOAD_QUERIES_DATA: {
            actions: ['loadQueriesData', 'stopLoading'],
          },
        },
      },
    },
  },
  {
    actions: {
      saveCovidStats: assign((_, e) => {
        return {
          sgStats: e.sgStats,
          globalStats: e.globalStats,
        }
      }),
      redirectLuckyDraw: () => {
        window.open(
          `https://gc-awards.netlify.app/?token=${localStorage.getItem(
            'token',
          )}`,
        )
      },
      stopLoading: assign({
        loading: initialLoading,
      }),
      startLoading: assign((ctx, e) => {
        return {
          loading: {
            ...ctx.loading,
            [e.title]: true,
          },
        }
      }),
      onEditableChange: assign((_ctx, e) => {
        return {
          editableValue: e.value,
        }
      }),
      closeEditItem: assign({
        editableItem: null,
        editableValue: null,
      }),
      editItem: assign((_, e) => ({
        editableItem: e.id,
        editableValue: e.value,
      })),
      onInputChange: assign((ctx, {type, ...rest}) => {
        return {
          inputValues: {...ctx.inputValues, ...rest},
        }
      }),
      toggleDarkMode: assign(ctx => ({darkMode: !ctx.darkMode})),
      promptUsername: assign(() => {
        const username = localStorage.getItem(USERNAME)
        if (!username || username === 'null') {
          const username = window.prompt('State your name...')
          localStorage.setItem(USERNAME, username)
        }

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
