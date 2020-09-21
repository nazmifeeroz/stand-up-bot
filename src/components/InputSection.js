import React from 'react'
import SyncLoader from 'react-spinners/SyncLoader'
import styled from 'styled-components'
import Linkify from 'react-linkify'

const componentDecorator = (href, text, key) => (
  <a href={href} key={key} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
)

const inputDataReducer = (key, data) => {
  let parsedData

  switch (key) {
    case 'sharing':
      parsedData = {
        id: data.id,
        content: `${data.contributor}: ${data.sharing}`,
        value: data.sharing,
      }
      break

    case 'help':
      parsedData = {
        id: data.id,
        content: data.assist,
        value: data.assist,
      }
      break
    case 'pairing':
      parsedData = {
        id: data.id,
        content: data.project,
        value: data.project,
      }
      break
    default:
      return null
  }

  return parsedData
}

const RenderCollection = React.memo(
  ({editableItem, editableValue, title, obj, send}) => {
    const parsedData = inputDataReducer(title, obj)
    return (
      <CollectionItem key={parsedData.id}>
        <Linkify componentDecorator={componentDecorator}>
          <StyledDiv>
            <StyledSpan>{parsedData.content}</StyledSpan>
            {editableItem !== parsedData.id ? (
              <StyledIconsDiv>
                <a
                  href="#/"
                  onClick={() =>
                    send('DELETE_ITEM', {id: parsedData.id, title})
                  }
                  tabIndex="-1"
                >
                  <i className="material-icons right">delete</i>
                </a>
                <a
                  href="#/"
                  onClick={() =>
                    send('EDIT_ITEM', {
                      id: parsedData.id,
                      value: parsedData.value,
                    })
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
        {editableItem === parsedData.id && (
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
    return (
      <>
        <SectionForm
          onSubmit={e => {
            e.preventDefault()
            send('UPDATE_EDITED_ITEM', {title})
          }}
        >
          <TitleWrapper>
            <SectionTitle>{title}</SectionTitle>
            <SyncLoader size={8} color={'#36D7B7'} loading={loading[title]} />
          </TitleWrapper>
          {data && data.length > 0 && (
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
  h5 {
    margin-right: 10px;
  }
`

const SectionForm = styled.form.attrs({
  className: 'section',
})``

const SectionTitle = styled.h5`
  text-transform: capitalize;
  background: linear-gradient(to right, hsl(150 100% 40%), hsl(180 100% 59%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Collections = styled.ul.attrs({className: 'collection'})`
  /* border: none !important;
  border-radius: 8px;
  padding: 3px !important;
  border-color: transparent;
  background-image: linear-gradient(#333, #333),
    linear-gradient(to right, hsl(150 100% 40%), hsl(180 100% 59%));
  background-origin: border-box;
  background-clip: content-box, border-box; */
  border-color: gray !important;
`

const CollectionItem = styled.li.attrs({className: 'collection-item'})`
  border-color: gray !important;
  /* border-color: transparent; */
  /* background-image: linear-gradient(#333, #333),
    linear-gradient(to right, hsl(150 100% 40%), hsl(180 100% 59%));
  background-origin: border-box;
  background-clip: content-box, border-box; */
  /* padding: 1px !important; */
  /* border: none !important;
  padding: 1px !important;
  border-color: transparent;
  background-image: linear-gradient(#333, #333),
    linear-gradient(to right, hsl(150 100% 40%), hsl(180 100% 59%));
  background-origin: border-box;
  background-clip: content-box, border-box; */
`

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
