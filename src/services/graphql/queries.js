import gql from 'graphql-tag'

export const GET_ACTIVE_SESSION = gql`
  query {
    sessions(
      limit: 1
      order_by: {created_at: desc}
      where: {active: {_eq: true}}
    ) {
      id
      published_at
    }
    lastSession: sessions(
      limit: 1
      order_by: {created_at: desc}
      where: {published_at: {_is_null: false}}
    ) {
      id
      published_at
    }
  }
`

// export const GET_LAST_PUBLISHED_SESSION = gql`
//   query {
//     sessions(
//       limit: 1
//       order_by: {created_at: desc}
//       where: {published_at: {_is_null: false}}
//     ) {
//       id
//       published_at
//     }
//   }
// `

export const GET_ALL_QUERIES = gql`
  query($last_published: timestamptz) {
    sharing: shares(
      where: {created_at: {_gte: $last_published}}
      order_by: {updated_at: desc}
    ) {
      id
      sharing
      contributor
      created_at
      updated_at
    }
    assistance(
      where: {created_at: {_gte: $last_published}}
      order_by: {updated_at: desc}
    ) {
      id
      assist
      created_at
      updated_at
    }
    sessions(where: {active: {_eq: true}}) {
      active
      status
    }
  }
`

export const GET_PAIRS = gql`
  query($yesterday: timestamptz) {
    pairs(
      where: {created_at: {_gte: $yesterday}}
      order_by: {updated_at: desc}
    ) {
      id
      project
      created_at
      updated_at
    }
  }
`

export const GET_POLLS = gql`
  query($today: timestamptz) {
    polls(where: {created_at: {_gte: $today}}, order_by: {created_at: desc}) {
      id
      title
      description
      options
      created_at
    }
  }
`
