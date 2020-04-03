import gql from 'graphql-tag'

export const NEW_SHARE = gql`
  subscription($lastPublishedAt: timestamptz) {
    shares(
      where: { created_at: { _gte: $lastPublishedAt } }
      order_by: { created_at: desc }
    ) {
      id
      created_at
      updated_at
      sharing
      contributor
    }
  }
`

export const NEW_HELP = gql`
  subscription($lastPublishedAt: timestamptz) {
    assistance(
      order_by: { created_at: desc }
      where: { created_at: { _gte: $lastPublishedAt } }
    ) {
      id
      assist
      created_at
      updated_at
    }
  }
`

export const NEW_PAIR = gql`
  subscription($yesterday: timestamptz) {
    pairs(
      order_by: { created_at: desc }
      where: { created_at: { _gte: $yesterday } }
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

export const NEW_POLL = gql`
  subscription($today: timestamptz) {
    polls(
      where: { created_at: { _gte: $today } }
      order_by: { created_at: desc }
    ) {
      created_at
      description
      id
      options
      title
    }
  }
`
