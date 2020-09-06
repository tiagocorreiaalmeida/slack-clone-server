import { createModule } from 'graphql-modules';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { isAuthenticatedMiddleware } from '../../../../shared/infra/graphql/middlewares';

const workspaceModule = createModule({
  id: 'workspace-module',
  typeDefs,
  resolvers,
  middlewares: {
    Mutation: {
      createWorkspace: [isAuthenticatedMiddleware],
    },
  },
});

export { workspaceModule };
