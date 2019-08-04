import gql from 'graphql-tag'

export const NEW_SHARE = gql`
  subscription {
    shares {
      sharing
    }
  }
`
