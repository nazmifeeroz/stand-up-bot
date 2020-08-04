import React from 'react'
import styled from 'styled-components'

const InputSection = React.memo(({title, placeholder, data, send}) => {
  console.log('data', data)

  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      {data && (
        <Collection>
          {data.map(obj => (
            <CollectionItem key={obj.id}>
              <StyledDiv>
                <StyledSpan>{`${obj.contributor}: ${obj.sharing}`}</StyledSpan>
                <StyledIconsDiv>
                  <a
                    href="#/"
                    onClick={() => send('DELETE_ITEM', {id: obj.id})}
                    tabIndex="-1"
                  >
                    <i
                      // data-testid={`remove-${type}${index}`}
                      className="material-icons right"
                    >
                      delete
                    </i>
                  </a>
                  <a
                    href="#/"
                    onClick={() => send('EDIT_ITEM', {id: obj.id})}
                    tabIndex="-1"
                  >
                    <i
                      // data-testid={`remove-${type}${index}`}
                      className="material-icons right"
                    >
                      edit
                    </i>
                  </a>
                </StyledIconsDiv>
              </StyledDiv>
            </CollectionItem>
          ))}
        </Collection>
      )}
    </Section>
  )
})

const Section = styled.div.attrs({
  className: 'section',
})``

const SectionTitle = styled.h5`
  text-transform: capitalize;
`

const Collection = styled.ul.attrs({className: 'collection'})``

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
