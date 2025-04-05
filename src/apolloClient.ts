import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://vortex.korabli.su/api/graphql/glossary/',
    cache: new InMemoryCache(),
});

export default client;