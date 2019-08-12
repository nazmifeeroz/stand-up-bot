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

export const UPDATE_SHARE = gql`
  mutation($id: Int!, $editedItem: String!) {
    update_shares(where: { id: { _eq: $id } }, _set: { sharing: $editedItem }) {
      affected_rows
    }
  }
`

export const UPDATE_HELP = gql`
  mutation($id: Int!, $editedItem: String!) {
    update_assistance(
      where: { id: { _eq: $id } }
      _set: { assist: $editedItem }
    ) {
      affected_rows
    }
  }
`

export const UPDATE_PAIR = gql`
  mutation($id: Int!, $editedItem: String!) {
    update_pairs(where: { id: { _eq: $id } }, _set: { project: $editedItem }) {
      affected_rows
    }
  }
`

export const DELETE_SHARE = gql`
  mutation($id: Int!) {
    delete_shares(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`

export const DELETE_PAIR = gql`
  mutation($id: Int!) {
    delete_pairs(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`

export const DELETE_HELP = gql`
  mutation($id: Int!) {
    delete_assistance(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`

export const START_SESSION = gql`
  mutation($token: String!) {
    insert_sessions(objects: { token: $token }) {
      affected_rows
      returning {
        id
      }
    }
  }
`

export const PUBLISH_STANDUP = gql`
  mutation($active: Boolean!, $content: String!, $id: uuid!, $status: String!) {
    update_sessions(
      where: { id: { _eq: $id } }
      _set: { active: $active, content: $content, status: $status }
    ) {
      affected_rows
    }
  }
`
