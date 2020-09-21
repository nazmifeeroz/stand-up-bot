import React, {useContext} from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import './styles.css'
import Body from './components/Body'
import Loader from './components/Loader'
import PromptStartSession from './components/PromptStartSession'
import {StoreContext} from './services/store'

const Main = () => {
  const {current, send} = useContext(StoreContext)

  return (
    <>
      {['verifyAuth', 'checkSession', 'showErrorMsg'].some(current.matches) && (
        <Loader current={current} />
      )}
      {current.matches('promptStartSession') && (
        <PromptStartSession send={send} />
      )}
      {current.matches('sessionStarted') && <Body />}
    </>
  )
}

export default Main
