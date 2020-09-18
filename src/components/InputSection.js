import React from 'react'
import SyncLoader from 'react-spinners/SyncLoader'
import styled from 'styled-components'
import Linkify from 'react-linkify'

const componentDecorator = (href, text, key) => (
  <a href={href} key={key} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
)

const RenderCollection = React.memo(
  ({editableItem, editableValue, title, obj, send}) => {
    return (
      <CollectionItem key={obj.id}>
        <Linkify componentDecorator={componentDecorator}>
          <StyledDiv>
            <StyledSpan>{`${obj.contributor}: ${obj.sharing}`}</StyledSpan>
            {editableItem !== obj.id ? (
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
                  onClick={() =>
                    send('EDIT_ITEM', {id: obj.id, value: obj.sharing})
                  }
                  tabIndex="-1"
                >
                  <i className="material-icons right">edit</i>
                </a>
              </StyledIconsDiv>
            ) : (
              <a href="#/" onClick={() => send('CLOSE_EDIT_ITEM')}>
                <i className="cobalt-icons right">close</i>
              </a>
            )}
          </StyledDiv>
        </Linkify>
        {editableItem === obj.id && (
          <InputElement
            title={title}
            placeholder=""
            value={editableValue}
            onChange={e =>
              send('ON_EDITABLE_CHANGE', {
                value: e.target.value,
              })
            }
          />
        )}
      </CollectionItem>
    )
  },
)

const InputElement = React.memo(({title, placeholder, value, onChange}) => {
  return (
    <>
      <input
        autoFocus
        placeholder={placeholder}
        aria-label={`${title}-input`}
        type="text"
        value={value}
        onChange={onChange}
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
  ({
    data,
    editableItem,
    editableValue,
    inputValue,
    loading,
    placeholder,
    send,
    title,
  }) => {
    console.log('render input section')
    return (
      <>
        <SectionForm
          onSubmit={e => {
            e.preventDefault()
            send('UPDATE_EDITED_ITEM')
          }}
        >
          <TitleWrapper>
            <SectionTitle>{title}</SectionTitle>
            <SyncLoader size={8} color={'#36D7B7'} loading={loading} />
          </TitleWrapper>
          {data && (
            <Collections>
              {data.map(obj => (
                <RenderCollection
                  key={obj.id}
                  title={title}
                  obj={obj}
                  send={send}
                  editableItem={editableItem}
                  editableValue={editableValue}
                />
              ))}
            </Collections>
          )}
        </SectionForm>
        <form
          onSubmit={e => {
            e.preventDefault()
            send('NEW_INPUT_PRESSED', {title})
          }}
        >
          <InputElement
            title={title}
            placeholder={placeholder}
            value={inputValue}
            onChange={e => send('ON_INPUT_CHANGE', {[title]: e.target.value})}
          />
        </form>
      </>
    )
  },
)

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  & > h5 {
    margin-right: 10px;
  }
`

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
