import React from 'react'
import './styles.css'

const Sharing = ({ addSharing, sharing, handleRemoveItem }) => {
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
              <a href="#/" onClick={() => handleRemoveItem(index, 'sharing')}>
                <i
                  data-testid={`remove-share${index}`}
                  className="material-icons right"
                >
                  close
                </i>
              </a>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="What are your thoughts...?"
          aria-label="sharing-input"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button
          data-testid="share-submit"
          type="submit"
          className="waves-effect waves-light btn-small"
        >
          Share
        </button>
      </form>
    </div>
  )
}

const NeedHelp = ({ addHelp, help, handleRemoveItem }) => {
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
              <a
                href="#/"
                data-testid={`remove-help${index}`}
                onClick={() => handleRemoveItem(index, 'help')}
              >
                <i
                  data-testid={`remove-share${index}`}
                  className="material-icons right"
                >
                  close
                </i>
              </a>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input
          className="validate"
          aria-label="help-input"
          placeholder="Anyone need help?..."
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button
          data-testid="help-submit"
          type="submit"
          className="waves-effect waves-light btn-small"
        >
          Help!
        </button>
      </form>
    </div>
  )
}

const PairConfig = ({ addPair, pairing, handleRemoveItem }) => {
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
        <ul className="collection" data-testid="pair-items">
          {pairing.map((s, index) => (
            <li key={index} className="collection-item">
              {s}
              <a
                data-testid={`remove-pair${index}`}
                href="#/"
                onClick={() => handleRemoveItem(index, 'pairing')}
              >
                <i
                  data-testid={`remove-share${index}`}
                  className="material-icons right"
                >
                  close
                </i>
              </a>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input
          className="validate"
          aria-label="pair-input"
          placeholder="Pairing config..."
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button
          data-testid="pair-submit"
          type="submit"
          className="waves-effect waves-light btn-small"
        >
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

  const handleRemoveItem = (index, type) => {
    switch (type) {
      case 'sharing':
        setSharing(sharing.filter(i => i !== sharing[index]))
        break
      case 'help':
        setHelp(help.filter(i => i !== help[index]))
        break
      case 'pairing':
        setPairing(pairing.filter(i => i !== pairing[index]))
        break
      default:
        console.log('nothing')
    }
  }

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
