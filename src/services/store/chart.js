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
          HAS_ERROR: {actions: 'routeToLogin'},
        },
      },
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
        on: {
          START_SESSION: {actions: 'startSession'},
          TOGGLE_DEV_MODE: {actions: 'toggleDevMode'},
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
          TOGGLE_DARK_MODE: {actions: 'toggleDarkMode'},
          SET_USERNAME: {
            actions: 'setUsername',
          },
          LOAD_QUERIES_DATA: {
            actions: ['loadQueriesData', 'stopLoading'],
          },
          DELETE_ITEM: {actions: ['deleteItem', 'startLoading']},
          EDIT_ITEM: {actions: 'editItem'},
          ON_INPUT_CHANGE: {actions: 'onInputChange'},
          NEW_INPUT_PRESSED: {actions: ['addNewInput', 'startLoading']},
          CLOSE_EDIT_ITEM: {actions: 'closeEditItem'},
          ON_EDITABLE_CHANGE: {actions: 'onEditableChange'},
          UPDATE_EDITED_ITEM: {actions: ['updateEditedItem', 'startLoading']},
        },
      },
    },
  },
  {
    actions: {
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
