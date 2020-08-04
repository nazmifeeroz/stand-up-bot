import React, {useContext} from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import './styles.css'
import {createGlobalStyle, css} from 'styled-components'
import Body from './components/Body'
import Loader from './components/Loader'
import PromptStartSession from './components/PromptStartSession'
import {StoreContext} from './services/store'

// import styled from 'styled-components'
// import CircleLoader from 'react-spinners/CircleLoader'

// import {doPublishStandup, useMutationReducer} from './services/utils'
// import useCovidStats from './services/useCovidStats'

const Main = () => {
  const {current, send} = useContext(StoreContext)

  return (
    <>
      <GlobalStyles darkMode={current.context.darkMode} />
      {['verifyAuth', 'checkSession'].some(current.matches) && (
        <Loader current={current} />
      )}
      {current.matches('promptStartSession') && (
        <PromptStartSession current={current} send={send} />
      )}
      {current.matches('sessionStarted') && (
        <Body current={current} send={send} />
      )}
    </>
  )
}

const GlobalStyles = createGlobalStyle`
${props =>
  props.darkMode &&
  css`
    body {
      background-color: #333;
      color: #fff;
    }

    input {
      color: #fff;
    }

    a {
      color: #b3e5fc !important;
    }

    .collection-item {
      background-color: #455a64 !important;
    }
  `}
  `

export default Main

// const CenterContainer = styled(motion.div)`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `

// const Switch = styled.div`
//   margin-top: 20px;
// `

// const Main = () => {
//   const store = React.useContext(StoreContext)
//   const {activeSession} = store
//   const {mutation} = useMutationReducer('session')
//   const {stats, globalStats, loading} = useCovidStats()
//   const [devMode, setDevMode] = useState(false)

//   useEffect(() => {
//     window.M.AutoInit()
//   }, [])

//   const doStartSession = async () => {
//     const token = localStorage.getItem('token')
//     mutation.insert({variables: {token, devMode}}).then(resp => {
//       localStorage.setItem(
//         'session_id',
//         resp.data.insert_sessions.returning[0].id,
//       )
//     })
//   }

//   const handleDevMode = mode => {
//     if (mode) {
//       const intention = window.prompt('State your intention.')
//       if (intention === process.env.REACT_APP_INTENTION) return setDevMode(true)
//       return alert('You may not enter...')
//     }
//   }

//   if (!activeSession || activeSession.length === 0)
//     return (
//       <CenterContainer
//         initial={{opacity: 0}}
//         animate={{opacity: 1}}
//         transition={{duration: 2}}
//         exit={{opacity: 0}}
//       >
//         <button
//           onClick={doStartSession}
//           className="waves-effect waves-light btn-large"
//         >
//           Start Standup Session
//         </button>
//         <Switch className="switch valign-wrapper right">
//           <label>
//             Dev Mode
//             <input
//               type="checkbox"
//               checked={devMode}
//               onChange={() => handleDevMode(!devMode)}
//             />
//             <span className="lever" />
//           </label>
//         </Switch>
//       </CenterContainer>
//     )

//   const handleChangeName = e => {
//     const input = window.prompt('State your name...')
//     store.setName(input)
//     localStorage.setItem('name', input)
//   }

//   if (!store.name || store.name === 'null') {
//     handleChangeName()
//   }

//   if (loading)
//     return (
//       <SpinnerWrapper
//         key="spinner"
//         initial={{scale: 0}}
//         animate={{scale: 1}}
//         transition={{
//           type: 'spring',
//           stiffness: 260,
//           damping: 20,
//         }}
//         exit={{scale: 0, opacity: 0}}
//       >
//         <CircleLoader color={'#36D7B7'} />
//         <div>&nbsp; Retrieving Covid Stats...</div>
//       </SpinnerWrapper>
//     )

//   return (
//     <>
//     </>
//   )
// }

// const ButtonsContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
// `

// const SpinnerWrapper = styled(motion.div)`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `

// export default Main
