import { createModule, gql } from 'graphql-modules';

const userModule = createModule({
  id: 'user-model',
  typeDefs: gql`
    type Query {
      test: String!
    }
  `,
  resolvers: {
    Query: {
      test() {
        return 'running';
      },
    },
  },
});

export { userModule };
