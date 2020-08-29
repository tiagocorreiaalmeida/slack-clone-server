import { createModule } from 'graphql-modules';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const userModule = createModule({
  id: 'user-model',
  typeDefs,
  resolvers,
});

export { userModule };
