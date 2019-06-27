import React from 'react'
import './styles.css'

const Sharing = ({ addSharing, sharing }) => {
  const [value, setValue] = React.useState('')
  const handleSubmit = e => {
    e.preventDefault()
    if (!value) return
    addSharing(value)
    setValue('')
  }
  return (
    <div className="section" data-testid="sharing">
      <h5>Sharing</h5>
      {sharing.length > 0 && (
        <ul className="collection" data-testid="sharing-items">
          {sharing.map((s, index) => (
            <li key={index} className="collection-item">
              {s}
              <i className="close-btn material-icons right">close</i>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="What are your thoughts...?"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit" className="waves-effect waves-light btn-small">
          Share
        </button>
      </form>
    </div>
  )
}

const NeedHelp = ({ addHelp, help }) => {
  const [value, setValue] = React.useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!value) return
    addHelp(value)
    setValue('')
  }
  return (
    <div className="section" data-testid="need-help">
      <h5>Need Help</h5>
      {help.length > 0 && (
        <ul className="collection" data-testid="help-items">
          {help.map((s, index) => (
            <li key={index} className="collection-item">
              {s}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input
          className="validate"
          placeholder="Anyone need help?..."
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit" className="waves-effect waves-light btn-small">
          Help!
        </button>
      </form>
    </div>
  )
}

const PairConfig = ({ addPair, pairing }) => {
  const [value, setValue] = React.useState('')
  const handleSubmit = e => {
    e.preventDefault()
    if (!value) return
    addPair(value)
    setValue('')
  }
  return (
    <div className="section" data-testid="pairing">
      <h5>Pairing Config</h5>
      {pairing.length > 0 && (
        <ul className="collection" data-testid="pairing-items">
          {pairing.map((s, index) => (
            <li key={index} className="collection-item">
              {s}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input
          className="validate"
          placeholder="Pairing config..."
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit" className="waves-effect waves-light btn-small">
          Let's Pair!
        </button>
      </form>
    </div>
  )
}

function App() {
  const [sharing, setSharing] = React.useState([])
  const [help, setHelp] = React.useState([])
  const [pairing, setPairing] = React.useState([])

  const addSharing = share => {
    const newShare = [...sharing, share]
    setSharing(newShare)
  }

  const addHelp = need => {
    const newHelp = [...help, need]
    setHelp(newHelp)
  }

  const addPair = pair => {
    const newPair = [...pairing, pair]
    setPairing(newPair)
  }

  const handlePublish = () => {
    console.table({ sharing, pairing, help })
    const date = new Date()
    const today = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
    const shareText = sharing.length > 0 ? sharing.join('\n - ') : ''
    const helpText = help.length > 0 ? help.join('\n - ') : ''
    const pairText = pairing.length > 0 ? pairing.join('\n - ') : ''
    const content = `
***__Stand Up__** (*${today}*)*

${sharing.length > 0 ? '**__Sharing__**\n - ' : ''}${shareText}

${help.length > 0 ? '**__Need Help_**\n - ' : ''}${helpText}

${pairing.length > 0 ? '**__Pairing_**\n - ' : ''}${pairText}
    `

    console.log('body', content)
    console.log('JSON.stringify(content)', JSON.stringify(content))

    console.log('process.env.REACT_APP_WEBHOOK', process.env.REACT_APP_WEBHOOK)

    // fetch(webhook, {
    //   method: 'POST',
    //   body: JSON.stringify({ content }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(res => console.log('res', res))
    //   .catch(err => console.log('err', err))
  }

  return (
    <div className="container">
      <h4>Stand Up Bot</h4>
      <div className="card">
        <div className="card-content">
          <Sharing addSharing={addSharing} sharing={sharing} />
          <NeedHelp addHelp={addHelp} help={help} />
          <PairConfig addPair={addPair} pairing={pairing} />
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
