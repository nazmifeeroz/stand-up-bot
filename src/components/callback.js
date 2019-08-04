import React from 'react'
import { Redirect } from 'react-router-dom'

const Callback = props => {
  console.log('props in callback', props)
  const { authToken, setAuthToken } = props
  const hash = props.location.hash.substr(1)

  const { id_token: token } = hash.split('&').reduce(function(result, item) {
    const parts = item.split('=')
    result[parts[0]] = parts[1]
    return result
  }, {})

  setAuthToken(token)
  console.log('authToken, token', authToken, token)
  localStorage.setItem('token', token)

  return <Redirect to="/" />
}

export default Callback
