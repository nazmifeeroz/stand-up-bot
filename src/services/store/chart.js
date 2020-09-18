import {assign, Machine} from 'xstate'

const USERNAME = '@username'

const storeMachine = Machine(
  {
    initial: 'verifyAuth',
    context: {
      darkMode: true,
      devMode: false,
      editableItem: null,
      editableValue: null,
      loadingMsg: '',
      username: '',
      inputValues: {
        sharing: '',
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
          EDIT_ITEM: {actions: 'editItem'},
          ON_INPUT_CHANGE: {actions: 'onInputChange'},
          NEW_INPUT_PRESSED: {actions: 'addNewInput'},
          CLOSE_EDIT_ITEM: {actions: 'closeEditItem'},
          ON_EDITABLE_CHANGE: {actions: 'onEditableChange'},
          UPDATE_EDITED_ITEM: {actions: 'updateEditedItem'},
        },
      },
    },
  },
  {
    actions: {
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
