import React from 'react'
import { StoreContext } from '../utils/store'

export default ({ type, description }) => {
  const [editableItem, setEditableItem] = React.useState(null)
  const [input, setInput] = React.useState('')
  const [removeItem, setRemoveItem] = React.useState('')
  const {
    [type]: [data, setData],
  } = React.useContext(StoreContext)

  React.useEffect(() => {
    if (removeItem === '') return
    if (window.confirm('Are you sure you wish to delete?')) {
      setData(data.filter(i => i !== data[removeItem]))
    }
    setRemoveItem('')
  }, [removeItem, setData, data])

  const addItem = e => {
    e.preventDefault()
    if (!input) return
    const newItem = [...data, input]
    setData(newItem)
    setInput('')
  }

  const editItem = e => {
    e.preventDefault()
    data[editableItem] = input
    setData(data)
    setInput('')
    setEditableItem(null)
  }

  const getTabIndex = () => {
    switch (type) {
      case 'sharing':
        return '1'
      case 'help':
        return '2'
      case 'pairing':
        return '3'
      default:
        return new Error()
    }
  }

  return (
    <div className="section" data-testid={type}>
      <h5>{type.charAt(0).toUpperCase() + type.slice(1)}</h5>
      {data.length > 0 && (
        <ul className="collection" data-testid={`${type}-items`}>
          {data.map((s, index) => (
            <li key={index} className="collection-item">
              {editableItem === index ? (
                <form onSubmit={editItem}>
                  <a href="#/" onClick={() => setEditableItem(null)}>
                    <i
                      data-testid={`remove-${type}${index}`}
                      className="material-icons right"
                    >
                      close
                    </i>
                  </a>
                  <input
                    tabIndex="1"
                    autoFocus
                    placeholder={description}
                    aria-label={`${type}-input`}
                    type="text"
                    value={input || s}
                    onChange={e => setInput(e.target.input)}
                  />
                  <small>Press Enter to save</small>
                </form>
              ) : (
                <div>
                  {s}
                  <a
                    href="#/"
                    onClick={() => setRemoveItem(index)}
                    tabIndex="-1"
                  >
                    <i
                      data-testid={`remove-${type}${index}`}
                      className="material-icons right"
                    >
                      delete
                    </i>
                  </a>
                  <a
                    href="#/"
                    onClick={() => setEditableItem(index)}
                    tabIndex="-1"
                  >
                    <i
                      data-testid={`remove-${type}${index}`}
                      className="material-icons right"
                    >
                      edit
                    </i>
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      {editableItem === null && (
        <form onSubmit={addItem}>
          <input
            placeholder={description}
            aria-label={`${type}-input`}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          {input && (
            <span
              className="helper-text"
              data-error="wrong"
              data-success="right"
            >
              <small>Press Enter to save</small>
            </span>
          )}
        </form>
      )}
    </div>
  )
}
