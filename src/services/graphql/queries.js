import gql from 'graphql-tag'

export const ALL_SHARES = gql`
  query {
    shares {
      id
      sharing
      created_at
    }
  }
`

export const ALL_PAIRS = gql`
  query {
    pairs {
      id
      pair
      project
    }
  }
`

export const ALL_HELPS = gql`
  query {
    assistance {
      id
      assist
    }
  }
`
