import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {WebSocketLink} from 'apollo-link-ws'
import {createHttpLink} from 'apollo-link-http'
import {getMainDefinition} from 'apollo-utilities'
import {split} from 'apollo-link'

export const createApolloClient = authToken => {
  console.log('creating apollo client')
  const headers = {
    Authorization: `Bearer ${authToken || ''}`,
  }

  const wsLink = process.browser
    ? new WebSocketLink({
        headers,
        uri: `wss://${process.env.REACT_APP_HASURA_URL}`,
        options: {
          reconnect: true,
        },
      })
    : null

  const httpLink = createHttpLink({
    headers,
    uri: `https://${process.env.REACT_APP_HASURA_URL}`,
    fetch,
  })

  const link = process.browser
    ? split(
        ({query}) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          )
        },
        wsLink,
        httpLink,
      )
    : httpLink

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })
}
