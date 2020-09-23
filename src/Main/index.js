import React, {useContext} from 'react'
import {StoreContext} from '../services/store'
import MainComponent from './Component'

const Main = () => {
  const {current, send} = useContext(StoreContext)

  return <MainComponent current={current} send={send} />
}

export default Main
