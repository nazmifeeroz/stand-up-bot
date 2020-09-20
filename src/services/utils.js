import {useMutation} from 'react-apollo'

import {
  ADD_HELP,
  ADD_PAIR,
  ADD_SHARE,
  DELETE_HELP,
  DELETE_PAIR,
  DELETE_SHARE,
  DELETE_SESSION,
  START_SESSION,
  UPDATE_HELP,
  UPDATE_PAIR,
  UPDATE_SHARE,
  PUBLISH_STANDUP,
} from '../services/graphql/mutations'

export const useMutationReducer = type => {
  const [addHelp] = useMutation(ADD_HELP)
  const [addPair] = useMutation(ADD_PAIR)
  const [addShare] = useMutation(ADD_SHARE)
  const [deleteHelp] = useMutation(DELETE_HELP)
  const [deleteSession] = useMutation(DELETE_SESSION)
  const [deletePair] = useMutation(DELETE_PAIR)
  const [deleteShare] = useMutation(DELETE_SHARE)
  const [updateHelp] = useMutation(UPDATE_HELP)
  const [updatePair] = useMutation(UPDATE_PAIR)
  const [updateShare] = useMutation(UPDATE_SHARE)
  const [startSession] = useMutation(START_SESSION)
  const [updateSession] = useMutation(PUBLISH_STANDUP)
  switch (type) {
    case 'sharing':
      return {
        mutation: {
          insert: addShare,
          update: updateShare,
          delete: deleteShare,
        },
      }
    case 'pairing':
      return {
        mutation: {insert: addPair, update: updatePair, delete: deletePair},
      }
    case 'help':
      return {
        mutation: {insert: addHelp, update: updateHelp, delete: deleteHelp},
      }
    case 'session':
      return {
        mutation: {
          insert: startSession,
          update: updateSession,
          delete: deleteSession,
        },
      }
    default:
      return false
  }
}

const doPollsSummary = polls => {
  return polls.map(poll => {
    const head = `\n**${poll.title}** - _${poll.description}_\n`
    const optionsBody = Object.keys(poll.options).map(
      option => `  - ${option} - ${poll.options[option].length} votes`,
    )
    return `${head}${optionsBody.join('\n')}`
  })
}

export const doPublishStandup = (
  {
    sharing: [sharingData],
    help: [helpData],
    pairing: [pairingData],
    pollsData: {
      data: {polls},
    },
  },
  mutation,
  stats,
  globalStats,
) => {
  const sharing = sharingData.map(d => d.value)
  const pairing = pairingData.map(d => d.value)
  const help = helpData.map(d => d.value)
  console.table([sharing, help, pairing])

  const authenticate = window.confirm(
    'You are about to publish an awesome stand up! Are you sure?',
  )

  // TODO: authenticate valid publisher
  if (!authenticate) return

  // if (sharing.length === 0 && help.length === 0 && pairing.length === 0)
  // if (help.length === 0 && pairing.length === 0)
  //   return window.M.toast({ html: 'You are not sharing anything!' })

  const date = new Date()
  const today = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  const shareText = sharing[0].length > 0 ? sharing.join('\n - ') : ''
  const helpText = help.length > 0 ? help.join('\n - ') : '*NO HELP NEEDED...*'
  const pollsText =
    polls.length > 0 ? doPollsSummary(polls) : '*NO POLLS CREATED...*'
  const pairText = pairing.length > 0 ? pairing.join('\n - ') : ''
  const content = `
  ***__Stand Up__** (*${today}*)*

  **_Singapore CoronaVirus Information_**
  Cases: ${stats.cases}
  Yesterday: ${stats.yesterdayCases} | Active: ${stats.active}
  Deaths: ${stats.deaths} | Recovered: ${stats.recovered} | Critical: ${stats.critical}

  **_Global CoronaVirus Information_**
  Cases: ${globalStats.cases} | Deaths: ${globalStats.deaths} | Recovered: ${globalStats.recovered}

  **_Sharing_**\n - ${shareText}

  **_Need Help_**\n - ${helpText}

  **_Pairing_**\n - ${pairText}

  **_Polls_**\n ${pollsText}
  `

  console.log('content', content)
  const id = localStorage.getItem('session_id')
  mutation
    .update({
      variables: {id, content, status: 'COMPLETED', active: false},
    })
    .then(() => {
      window.M.toast({html: 'Stand up published! Have a good day!'})
    })
    .catch(err => console.log('err', err))
  return
}
