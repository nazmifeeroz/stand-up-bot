import gql from 'graphql-tag'

export const NEW_SHARE = gql`
  subscription($getToday: timestamptz) {
    shares(
      limit: 1
      order_by: { updated_at: desc }
      where: { created_at: { _gte: $getToday } }
    ) {
      created_at
      id
      sharing
    }
  }
`

export const NEW_HELP = gql`
  subscription($getToday: timestamptz) {
    assistance(
      limit: 1
      order_by: { updated_at: desc }
      where: { created_at: { _gte: $getToday } }
    ) {
      assist
      created_at
      id
    }
  }
`

export const NEW_PAIR = gql`
  subscription($getToday: timestamptz) {
    pairs(
      limit: 1
      order_by: { updated_at: desc }
      where: { created_at: { _gte: $getToday } }
    ) {
      created_at
      id
      project
    }
  }
`
