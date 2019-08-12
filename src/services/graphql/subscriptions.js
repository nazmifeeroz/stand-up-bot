import gql from 'graphql-tag'

export const NEW_SHARE = gql`
  subscription($getToday: timestamptz) {
    shares(
      where: { updated_at: { _gte: $getToday } }
      order_by: { updated_at: desc }
    ) {
      id
      created_at
      updated_at
      sharing
    }
  }
`

export const NEW_HELP = gql`
  subscription($getToday: timestamptz) {
    assistance(
      order_by: { updated_at: desc }
      where: { created_at: { _gte: $getToday } }
    ) {
      id
      assist
      created_at
      updated_at
    }
  }
`

export const NEW_PAIR = gql`
  subscription($getToday: timestamptz) {
    pairs(
      order_by: { updated_at: desc }
      where: { created_at: { _gte: $getToday } }
    ) {
      id
      created_at
      updated_at
      project
    }
  }
`

export const NEW_SESSION = gql`
  subscription {
    sessions(where: { active: { _eq: true } }) {
      active
      id
      status
    }
  }
`
