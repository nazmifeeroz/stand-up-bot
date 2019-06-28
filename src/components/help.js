import React from 'react'

export default ({ addHelp, help, handleRemoveItem }) => {
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
