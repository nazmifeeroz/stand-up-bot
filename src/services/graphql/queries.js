import gql from 'graphql-tag'

export const ALL_SHARES = gql`
  query($today: timestamptz) {
    shares(
      where: { created_at: { _gte: $today } }
      order_by: { updated_at: desc }
    ) {
      id
      sharing
      created_at
      updated_at
    }
  }
`

export const ALL_PAIRS = gql`
  query($today: timestamptz) {
    pairs(
      where: { created_at: { _gte: $today } }
      order_by: { updated_at: desc }
    ) {
      id
      project
      created_at
      updated_at
    }
  }
`

export const ALL_HELPS = gql`
  query($today: timestamptz) {
    assistance(
      where: { created_at: { _gte: $today } }
      order_by: { updated_at: desc }
    ) {
      id
      assist
      created_at
      updated_at
    }
  }
`
