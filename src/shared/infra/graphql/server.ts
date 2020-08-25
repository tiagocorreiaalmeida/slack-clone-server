import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createServer } from 'http';

import { application } from './application';
import { env } from '../../../config';

const { PORT } = env;

const schema = application.createSchemaForApollo();

const server = new ApolloServer({
  schema,
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
