export default ({ sharing: [sharing], help: [help], pairing: [pairing] }) => {
  // console.table([sharing, help, pairing])

  const authenticate = prompt('Who are you?', 'Alan Witwicky')

  const body = JSON.stringify({ sharing, help, pairing, authenticate })

  fetch('https://1hj3o6wojk.execute-api.us-east-2.amazonaws.com/prod/', {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(resp => {
      console.log('data.body', resp.body)
    })
    .catch(err => console.log('err', err))
  return
}
