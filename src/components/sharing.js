import React from 'react'

export default ({ addSharing, sharing, handleRemoveItem }) => {
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
