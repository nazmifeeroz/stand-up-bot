import React from 'react'
import AppContext from '../utils/context'

export default ({ type, description }) => {
  const [value, setValue] = React.useState('')
  const [removeItem, setRemoveItem] = React.useState('')
  const {
    [type]: [data, setData],
  } = React.useContext(AppContext)

  React.useEffect(() => {
    if (removeItem === '') return
    setData(data.filter(i => i !== data[removeItem]))
    setRemoveItem('')
  }, [removeItem, setData, data])

  const addItem = e => {
    e.preventDefault()
    if (!value) return
    const newItem = [...data, value]
    setData(newItem)
    setValue('')
  }

  return (
    <div className="section" data-testid={type}>
      <h5>{type.charAt(0).toUpperCase() + type.slice(1)}</h5>
      {data.length > 0 && (
        <ul className="collection" data-testid={`${type}-items`}>
          {data.map((s, index) => (
            <li key={index} className="collection-item">
              {s}
              <a href="#/" onClick={() => setRemoveItem(index)}>
                <i
                  data-testid={`remove-${type}${index}`}
                  className="material-icons right"
                >
                  close
                </i>
              </a>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={addItem}>
        <input
          placeholder={description}
          aria-label={`${type}-input`}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button
          data-testid={`${type}-submit`}
          type="submit"
          className="waves-effect waves-light btn-small"
        >
          <i className="material-icons right">add_circle</i>
          Add
        </button>
      </form>
    </div>
  )
}
