import gql from 'graphql-tag'

export const NEW_SHARE = gql`
  subscription {
    shares(limit: 1, order_by: { id: desc }) {
      created_at
      id
      sharing
    }
  }
`

export const NEW_HELP = gql`
  subscription {
    assistance(limit: 1, order_by: { id: desc }) {
      assist
      created_at
      id
    }
  }
`
