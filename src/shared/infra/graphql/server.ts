import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createServer } from 'http';

import { application } from './application';
import { UseCases } from '../../../bootstrap/useCases';
import { env } from '../../../config';

declare global {
  namespace GraphQLModules {
    interface GlobalContext {
      useCases: UseCases;
    }
  }
}

const { PORT } = env;

const schema = application.createSchemaForApollo();

export const startServer = (useCases: UseCases): void => {
  const server = new ApolloServer({
    schema,
    context: { useCases },
  });

  const app = express();
  server.applyMiddleware({ app });
  const httpServer = createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen(PORT, () => {
    console.log('Server up 🚀 ');
    console.log(`Playground: http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`Subscriptions: ws://localhost:${PORT}${server.subscriptionsPath}`);
  });
};
