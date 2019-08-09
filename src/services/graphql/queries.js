import gql from 'graphql-tag'

export const ALL_SHARES = gql`
  query($today: timestamptz) {
    shares(where: { created_at: { _gte: $today } }) {
      id
      sharing
      created_at
    }
  }
`

export const ALL_PAIRS = gql`
  query($today: timestamptz) {
    pairs(where: { created_at: { _gte: $today } }) {
      id
      project
      created_at
    }
  }
`

export const ALL_HELPS = gql`
  query($today: timestamptz) {
    assistance(where: { created_at: { _gte: $today } }) {
      id
      assist
      created_at
    }
  }
`
