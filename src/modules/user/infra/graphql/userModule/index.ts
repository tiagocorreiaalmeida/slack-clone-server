import { createModule } from 'graphql-modules';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const userModule = createModule({
  id: 'user-module',
  typeDefs,
  resolvers,
});

export { userModule };
