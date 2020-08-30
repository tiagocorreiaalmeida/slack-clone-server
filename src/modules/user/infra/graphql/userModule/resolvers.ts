import { MutationResolvers } from '../../../../../shared/infra/graphql/generated/typed-schema';
import { UserInputError } from 'apollo-server-express';

export const resolvers = {
  Mutation: {
    async login(_, { data }, { useCases }: GraphQLModules.Context) {
      const dataOrError = await useCases.user.login.execute(data);
      if (dataOrError.isError) {
        throw new UserInputError(dataOrError.getError());
      }

      //set on cookie the refresh token
      return dataOrError.getValue();
    },
    async register(_, { data }, { useCases }: GraphQLModules.Context) {
      const userOrError = await useCases.user.createUser.execute(data);
      if (userOrError.isError) {
        throw new UserInputError(userOrError.getError());
      }

      return userOrError.getValue();
    },
    async refreshToken(_, args, { useCases }: GraphQLModules.Context) {
      //get refresh token from cookie
      const tokensOrError = await useCases.user.refreshAccessToken.execute({
        refreshToken: '',
      });
      if (tokensOrError.isError) {
        throw new UserInputError(tokensOrError.getError());
      }

      //set on cookie the refresh token
      return tokensOrError.getValue().accessToken;
    },
  } as MutationResolvers,
};
