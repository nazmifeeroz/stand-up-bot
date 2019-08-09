import gql from 'graphql-tag'

export const ADD_SHARE = gql`
  mutation($input: String!) {
    insert_shares(objects: { sharing: $input }) {
      returning {
        id
        created_at
        sharing
      }
    }
  }
`

export const ADD_HELP = gql`
  mutation($input: String!) {
    insert_assistance(objects: { assist: $input }) {
      returning {
        assist
        created_at
        id
      }
    }
  }
`

export const ADD_PAIR = gql`
  mutation($input: String!) {
    insert_pairs(objects: { project: $input }) {
      returning {
        project
        created_at
        id
      }
    }
  }
`
