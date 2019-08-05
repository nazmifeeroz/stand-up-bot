import gql from 'graphql-tag'

export const NEW_SHARE = gql`
  subscription {
    shares {
      created_at
      id
      sharing
    }
  }
`

export const NEW_HELP = gql`
  subscription {
    assistance {
      assist
      created_at
      id
    }
  }
`
