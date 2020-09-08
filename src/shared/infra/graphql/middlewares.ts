/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticationError } from 'apollo-server-express';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isAuthenticatedMiddleware = ({ context }, next: any): any => {
  if (!context.userId) {
    throw new AuthenticationError('Authentication required');
  }

  return next();
};
