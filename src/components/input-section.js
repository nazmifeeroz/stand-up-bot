import React from 'react'

import { Controlled as CodeMirror } from 'react-codemirror2'
import '../codemirror.css'
import 'codemirror/keymap/vim.js'

import { StoreContext } from '../services/store'

export default ({ type, description }) => {
  const [editableItem, setEditableItem] = React.useState(null)
  const [input, setInput] = React.useState('')
  const [removeItem, setRemoveItem] = React.useState('')
  const {
    [type]: [data, setData],
    vimMode,
  } = React.useContext(StoreContext)

  React.useEffect(() => {
    if (removeItem === '') return
    if (window.confirm('Are you sure you wish to delete?')) {
      const newData = data.filter(i => i !== data[removeItem])
      setData(newData)
      if (type === 'pairing')
        localStorage.setItem('pairing', JSON.stringify(newData))
    }
    setRemoveItem('')
  }, [removeItem, setData, data, type])

  const addItem = e => {
    e && e.preventDefault()
    if (!input) return
    const newItem = [...data, input]
    setData(newItem)
    if (type === 'pairing')
      localStorage.setItem('pairing', JSON.stringify(newItem))
    setInput('')
  }

  const editItem = e => {
    e && e.preventDefault()
    data[editableItem] = input
    setData(data)
    setInput('')
    setEditableItem(null)
  }

  const onVimEnterPress = e => {
    e === 'add' ? addItem() : editItem()
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
                      className="cobalt-icons right"
                    >
                      close
                    </i>
                  </a>
                  {vimMode ? (
                    <CodeMirror
                      value={input || s}
                      options={{
                        keyMap: 'vim',
                        extraKeys: {
                          Enter: () => onVimEnterPress('edit'),
                        },
                      }}
                      onBeforeChange={(editor, data, value) => {
                        setInput(value)
                      }}
                      onChange={(editor, data, value) => {
                        setInput(value)
                      }}
                    />
                  ) : (
                    <input
                      autoFocus
                      placeholder={description}
                      aria-label={`${type}-input`}
                      type="text"
                      value={input || s}
                      onChange={e => setInput(e.target.value)}
                    />
                  )}
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
          {vimMode ? (
            <CodeMirror
              value={input}
              options={{
                keyMap: 'vim',
                showCursorWhenSelecting: true,
                extraKeys: {
                  Enter: () => onVimEnterPress('add'),
                },
              }}
              onBeforeChange={(editor, data, value) => {
                setInput(value)
              }}
            />
          ) : (
            <input
              placeholder={description}
              aria-label={`${type}-input`}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          )}
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
