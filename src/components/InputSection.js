import React from 'react'
import styled from 'styled-components'
import Linkify from 'react-linkify'

const componentDecorator = (href, text, key) => (
  <a href={href} key={key} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
)

const RenderCollection = React.memo(({obj, send}) => {
  return (
    <CollectionItem key={obj.id}>
      <Linkify componentDecorator={componentDecorator}>
        <StyledDiv>
          <StyledSpan>{`${obj.contributor}: ${obj.sharing}`}</StyledSpan>
          <StyledIconsDiv>
            <a
              href="#/"
              onClick={() => send('DELETE_ITEM', {id: obj.id})}
              tabIndex="-1"
            >
              <i className="material-icons right">delete</i>
            </a>
            <a
              href="#/"
              onClick={() => send('EDIT_ITEM', {id: obj.id})}
              tabIndex="-1"
            >
              <i className="material-icons right">edit</i>
            </a>
          </StyledIconsDiv>
        </StyledDiv>
      </Linkify>
    </CollectionItem>
  )
})

const InputElement = React.memo(({title, placeholder, value, send}) => {
  return (
    <>
      <input
        placeholder={placeholder}
        aria-label={`${title}-input`}
        type="text"
        value={value}
        onChange={e => send('ON_INPUT_CHANGE', {[title]: e.target.value})}
      />
      {value && (
        <span className="helper-text" data-error="wrong" data-success="right">
          <small>Press Enter to save</small>
        </span>
      )}
    </>
  )
})

const InputSection = React.memo(
  ({title, placeholder, data, send, inputValue}) => {
    console.log('render input section')
    return (
      <SectionForm
        onSubmit={e => {
          e.preventDefault()
          send('NEW_INPUT_PRESSED', {title})
        }}
      >
        <SectionTitle>{title}</SectionTitle>
        {data && (
          <Collections>
            {data.map(obj => (
              <RenderCollection key={obj.id} obj={obj} send={send} />
            ))}
          </Collections>
        )}
        <InputElement
          title={title}
          placeholder={placeholder}
          value={inputValue}
          send={send}
        />
      </SectionForm>
    )
  },
)

const SectionForm = styled.form.attrs({
  className: 'section',
})``

const SectionTitle = styled.h5`
  text-transform: capitalize;
`

const Collections = styled.ul.attrs({className: 'collection'})``

const CollectionItem = styled.li.attrs({className: 'collection-item'})``

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledSpan = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const StyledIconsDiv = styled.div`
  min-width: 80px;
`

export default InputSection
