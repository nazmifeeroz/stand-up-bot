import React from 'react'
import styled from 'styled-components'
import Linkify from 'react-linkify'
import {useMutationReducer} from '../services/utils'

import {Controlled as CodeMirror} from 'react-codemirror2'
import '../codemirror.css'
import 'codemirror/keymap/vim.js'

import {StoreContext} from '../services/store'
export default ({type, description}) => {
  const [editableItem, setEditableItem] = React.useState(null)
  const [input, setInput] = React.useState('')
  const [removeItem, setRemoveItem] = React.useState('')
  const {
    [type]: [data, setData],
    vimMode,
    name,
  } = React.useContext(StoreContext)

  const {mutation} = useMutationReducer(type)

  React.useEffect(() => {
    if (removeItem === '') return
    if (window.confirm('Are you sure you wish to delete?')) {
      const newData = data.filter(i => i !== data[removeItem])
      mutation
        .delete({variables: {id: data[removeItem].id}})
        .catch(err => console.log('err', err))
      setData(newData)
      if (type === 'pairing')
        localStorage.setItem('pairing', JSON.stringify(newData))
    }
    setRemoveItem('')
  }, [data, mutation, removeItem, setData, type])

  React.useEffect(() => {
    if (data && data[editableItem]) setInput(data[editableItem].value)
  }, [data, editableItem])

  const addItem = e => {
    e && e.preventDefault()
    if (!input) return
    let addItem = {input}
    if (type === 'sharing') {
      // const userName = localStorage.getItem('name')
      addItem = {...addItem, contributor: name}
    }
    const newItem = [{value: input, ...addItem}, ...data]
    setData(newItem)
    mutation.insert({variables: addItem}).catch(err => console.log('err', err))
    if (type === 'pairing')
      localStorage.setItem('pairing', JSON.stringify(newItem))
    setInput('')
  }

  const editItem = e => {
    e && e.preventDefault()
    data[editableItem].value = input
    setData(data)
    mutation
      .update({
        variables: {id: data[editableItem].id, editedItem: input},
      })
      .catch(err => console.log('err', err))
    setInput('')
    setEditableItem(null)
  }

  const onVimEnterPress = e => {
    e === 'add' ? addItem() : editItem()
  }

  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  )
  return (
    <Linkify componentDecorator={componentDecorator}>
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
                        value={input || s.value}
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
                        value={input || s.value}
                        onChange={e => setInput(e.target.value)}
                        onBlur={editItem}
                      />
                    )}
                    <small>Press Enter to save</small>
                  </form>
                ) : (
                  <StyledDiv>
                    <StyledSpan>
                      {`${s.contributor ? `${s.contributor}: ` : ''} ${
                        s.value
                      }`}
                    </StyledSpan>
                    <StyledIconsDiv>
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
                    </StyledIconsDiv>
                  </StyledDiv>
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
    </Linkify>
  )
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledIconsDiv = styled.div`
  /* display: flex;
  justify-content: space-between; */
  min-width: 80px;
`

const StyledSpan = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
