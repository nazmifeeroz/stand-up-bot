import React from 'react'

export default ({ addPair, pairing, handleRemoveItem }) => {
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
