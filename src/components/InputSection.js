import React from 'react'
import styled from 'styled-components'

const RenderCollection = React.memo(({obj, send}) => {
  return (
    <CollectionItem key={obj.id}>
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
    </CollectionItem>
  )
})

const InputElement = React.memo(({title, placeholder}) => {
  const [inputValue, setInputValue] = React.useState('')

  return (
    <input
      placeholder={placeholder}
      aria-label={`${title}-input`}
      type="text"
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
    />
  )
})

const InputSection = React.memo(({title, placeholder, data, send}) => {
  return (
    <Section
      onSubmit={e => {
        e.preventDefault()
        console.log('e', e)
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
      <InputElement title={title} placeholder={placeholder} />
    </Section>
  )
})

const Section = styled.form.attrs({
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
