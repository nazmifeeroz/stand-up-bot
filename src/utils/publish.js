export const handlePublish = () => {
  console.table({ sharing, pairing, help })
  const date = new Date()
  const today = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  const shareText = sharing.length > 0 ? sharing.join('\n - ') : ''
  const helpText = help.length > 0 ? help.join('\n - ') : ''
  const pairText = pairing.length > 0 ? pairing.join('\n - ') : ''
  const content = `
  ***__Stand Up__** (*${today}*)*

  **_Sharing_**\n - ${shareText}

  **_Need Help_**\n - ${helpText}

  **_Pairing_**\n - ${pairText}
  `

  console.log('body', content)
  const webhook = process.env.REACT_APP_WEBHOOK

  fetch(webhook, {
    method: 'POST',
    body: JSON.stringify({ content }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => console.log('res', res))
    .catch(err => console.log('err', err))
}
