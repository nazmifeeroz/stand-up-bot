// import discordResponse from '../../discord-sample.js'
export const publishStandup = ({
  sharing: [sharing],
  help: [help],
  pairing: [pairing],
}) => {
  console.table([sharing, help, pairing])

  const authenticate = window.confirm(
    'You are about to publish an awesome stand up! Are you sure?'
  )

  // TODO: authenticate valid publisher
  if (!authenticate) return

  if (sharing.length === 0 && help.length === 0 && pairing.length === 0)
    return window.M.toast({ html: 'You are not sharing anything!' })

  const date = new Date()
  const today = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  const shareText = sharing[0].length > 0 ? sharing.join('\n - ') : ''
  const helpText = help.length > 0 ? help.join('\n - ') : '*NO HELP NEEDED...*'
  const pairText = pairing.length > 0 ? pairing.join('\n - ') : ''
  const content = `
  ***__Stand Up__** (*${today}*)*

  **_Sharing_**\n - ${shareText}

  **_Need Help_**\n - ${helpText}

  **_Pairing_**\n - ${pairText}
  `

  fetch(process.env.REACT_APP_WEBHOOK, {
    method: 'POST',
    body: JSON.stringify({ content }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      window.M.toast({ html: 'Stand up published! Have a good day!' })
    })
    .catch(err => console.log('err', err))
  return
}

export const fetchFromDiscord = () => {
  console.log('fetching data from discord')
  // TODO: get user token and get channel messages
  // filter latest messages since last standup
  // print them into store
}
