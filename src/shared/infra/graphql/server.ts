import { ApolloServer } from 'apollo-server-express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { Response, Request } from 'express';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';

import { application } from './application';
import { UseCases } from '../../../bootstrap/useCases';
import { env } from '../../../config';

declare global {
  namespace GraphQLModules {
    interface GlobalContext {
      useCases: UseCases;
      req: Request;
      res: Response;
    }
  }
}

const { PORT } = env;

const schema = application.createSchemaForApollo();

export const startServer = (useCases: UseCases): void => {
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, useCases }),
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
