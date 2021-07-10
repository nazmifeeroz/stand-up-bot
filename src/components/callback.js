import React from 'react'
import {Redirect} from 'react-router-dom'

const Callback = ({location, setAuthToken}) => {
  React.useEffect(() => {
    const hash = location.hash.substr(1)

    const {id_token: token} = hash.split('&').reduce(function (result, item) {
      const parts = item.split('=')
      result[parts[0]] = parts[1]
      return result
    }, {})

    setAuthToken(token)
    localStorage.setItem('token', token)
  }, [location, setAuthToken])

  return <Redirect to="/" />
}

export default Callback
