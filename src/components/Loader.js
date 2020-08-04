import React from 'react'
import CircleLoader from 'react-spinners/CircleLoader'
import {motion} from 'framer-motion'
import styled from 'styled-components'

const Loader = React.memo(({current}) => {
  return (
    <SpinnerWrapper
      key="spinner"
      initial={{scale: 0}}
      animate={{scale: 1}}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      <CircleLoader color={'#36D7B7'} />
      <LoadingLabel>{current.context.loadingMsg}</LoadingLabel>
    </SpinnerWrapper>
  )
})

const SpinnerWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoadingLabel = styled.div`
  margin-left: 10px;
`

export default Loader
