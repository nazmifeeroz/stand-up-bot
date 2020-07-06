import ApolloClient from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {WebSocketLink} from 'apollo-link-ws'

export const createApolloClient = authToken => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: process.env.REACT_APP_HASURA_URL,
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            Authorization: `Bearer ${authToken ? authToken : ''}`,
          },
        },
      },
    }),
    cache: new InMemoryCache(),
  })
}
