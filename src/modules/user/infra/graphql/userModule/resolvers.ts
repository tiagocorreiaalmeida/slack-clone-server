import { MutationResolvers } from '../../../../../shared/infra/graphql/generated/typed-schema';
import { UserInputError } from 'apollo-server-express';
import { REFRESH_TOKEN_FAILED } from '../../../useCases/refreshAccessToken/refreshAccessTokenErrors';

export const REFRESH_TOKEN_KEY = 'jid';

export const resolvers = {
  Mutation: {
    async login(_, { data }, { useCases, res }: GraphQLModules.Context) {
      const dataOrError = await useCases.user.login.execute(data);
      if (dataOrError.isError) {
        throw new UserInputError(dataOrError.getError());
      }

      const loginDTO = dataOrError.getValue();

      res.cookie(REFRESH_TOKEN_KEY, loginDTO.refreshToken, { httpOnly: true });
      return loginDTO;
    },
    async register(_, { data }, { useCases }: GraphQLModules.Context) {
      const userOrError = await useCases.user.createUser.execute(data);
      if (userOrError.isError) {
        throw new UserInputError(userOrError.getError());
      }

      return userOrError.getValue();
    },
    async refreshToken(_, args, { useCases, res, req }: GraphQLModules.Context) {
      const refreshToken = req.cookies[REFRESH_TOKEN_KEY];

      if (!refreshToken) {
        throw new UserInputError(REFRESH_TOKEN_FAILED);
      }

      const tokensOrError = await useCases.user.refreshAccessToken.execute({
        refreshToken,
      });

      if (tokensOrError.isError) {
        throw new UserInputError(tokensOrError.getError());
      }

      const refreshTokenDTO = tokensOrError.getValue();

      res.cookie(REFRESH_TOKEN_KEY, refreshTokenDTO.refreshToken, { httpOnly: true });
      return refreshTokenDTO.accessToken;
    },
  } as MutationResolvers,
};
