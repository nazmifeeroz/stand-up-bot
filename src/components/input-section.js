import React from 'react'
import { AppContext } from '../utils/context'

export default ({ type, description }) => {
  const [editMode, setEditMode] = React.useState(null)
  const [value, setValue] = React.useState('')
  const [removeItem, setRemoveItem] = React.useState('')
  const {
    [type]: [data, setData],
  } = React.useContext(AppContext)

  React.useEffect(() => {
    if (removeItem === '') return
    if (window.confirm('Are you sure you wish to delete?')) {
      setData(data.filter(i => i !== data[removeItem]))
    }
    setRemoveItem('')
  }, [removeItem, setData, data])

  const addItem = e => {
    e.preventDefault()
    if (!value) return
    const newItem = [...data, value]
    setData(newItem)
    setValue('')
  }

  const editItem = e => {
    e.preventDefault()
    data[editMode] = value
    setData(data)
    setValue('')
    setEditMode(null)
  }

  return (
    <div className="section" data-testid={type}>
      <h5>{type.charAt(0).toUpperCase() + type.slice(1)}</h5>
      {data.length > 0 && (
        <ul className="collection" data-testid={`${type}-items`}>
          {data.map((s, index) => (
            <li key={index} className="collection-item">
              {editMode === index ? (
                <form onSubmit={editItem}>
                  <a href="#/" onClick={() => setEditMode(null)}>
                    <i
                      data-testid={`remove-${type}${index}`}
                      className="material-icons right"
                    >
                      close
                    </i>
                  </a>
                  <input
                    autoFocus
                    placeholder={description}
                    aria-label={`${type}-input`}
                    type="text"
                    value={value || s}
                    onChange={e => setValue(e.target.value)}
                  />
                  <small>Press Enter to save</small>
                </form>
              ) : (
                <div>
                  {s}
                  <a href="#/" onClick={() => setRemoveItem(index)}>
                    <i
                      data-testid={`remove-${type}${index}`}
                      className="material-icons right"
                    >
                      delete
                    </i>
                  </a>
                  <a href="#/" onClick={() => setEditMode(index)}>
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
      {editMode === null && (
        <form onSubmit={addItem}>
          <input
            placeholder={description}
            aria-label={`${type}-input`}
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          {value && (
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
