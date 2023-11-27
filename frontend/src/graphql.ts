import {
  ApolloClient,
  createHttpLink,
  DefaultOptions,
  InMemoryCache,
} from '@apollo/client/core';

// HTTP connection to the API
const httpLink = createHttpLink({
  // Absolute URL here
  uri: 'http://localhost:3000/graphql',
});

// Disable the cache
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions,
});

export default apolloClient;
