// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Response, Request } from 'express';

import { UseCases } from '../../../bootstrap/useCases';
import { AuthService } from '../../../modules/user/services/auth/authService';

declare global {
  namespace GraphQLModules {
    interface GlobalContext {
      useCases: UseCases;
      req: Request;
      res: Response;
      userId?: string;
    }
  }
}

type Context = GraphQLModules.GlobalContext;

export const getContext = ({
  authService,
  useCases,
}: {
  authService: AuthService;
  useCases: UseCases;
}) => async ({ req, res }: { req: Request; res: Response }): Promise<Context> => {
  const { authorization } = req.headers;

  const token = authorization?.replace('Bearer ', '');
  let userId: string | undefined;

  if (token) {
    try {
      const decodedToken = await authService.decodeAccessToken(token);
      userId = decodedToken.userId;
    } catch (e) {}
  }

  return {
    req,
    res,
    useCases,
    userId,
  };
};
