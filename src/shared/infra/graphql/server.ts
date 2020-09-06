/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';

import { application } from './application';
import { env } from '../../../config';

const { PORT } = env;

const schema = application.createSchemaForApollo();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const startServer = (context: any): void => {
  const server = new ApolloServer({
    schema,
    context,
  });

  const app = express();
  app.use(cookieParser());
  server.applyMiddleware({ app });

  const httpServer = createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen(PORT, () => {
    console.log('Server up 🚀 ');
    console.log(`Playground: http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`Subscriptions: ws://localhost:${PORT}${server.subscriptionsPath}`);
  });
};
