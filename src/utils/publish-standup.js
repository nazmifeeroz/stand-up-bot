export default ({ sharing: [sharing], help: [help], pairing: [pairing] }) => {
  console.table([sharing, help, pairing])

  const authenticate = prompt('Who are you?', 'Alan Witwicky')

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
