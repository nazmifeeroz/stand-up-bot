import React from 'react'
import './styles.css'
import Sharing from './components/sharing'
import NeedHelp from './components/help'
import PairConfig from './components/pairing'

function App() {
  const [sharing, setSharing] = React.useState([])
  const [help, setHelp] = React.useState([])
  const [pairing, setPairing] = React.useState([])

  const handlePublish = () => {
    console.table({ sharing, pairing, help })
    const date = new Date()
    const today = `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()}`
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

  return (
    <div className="container">
      <h4>Stand Up Bot</h4>
      <div className="card">
        <div className="card-content">
          <Sharing
            addSharing={addSharing}
            sharing={sharing}
            handleRemoveItem={handleRemoveItem}
          />
          <NeedHelp
            addHelp={addHelp}
            help={help}
            handleRemoveItem={handleRemoveItem}
          />
          <PairConfig
            addPair={addPair}
            pairing={pairing}
            handleRemoveItem={handleRemoveItem}
          />
        </div>
      </div>
      <div className="right-align">
        <button
          onClick={handlePublish}
          className="orange waves-effect waves-light btn-large"
        >
          Publish!
        </button>
      </div>
    </div>
  )
}

export default App
