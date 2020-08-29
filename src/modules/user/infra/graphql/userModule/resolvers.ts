import { createUserUseCase } from '../../../useCases/createUser';
import { loginUseCase } from '../../../useCases/login';
import { refreshAccessTokenUseCase } from '../../../useCases/refreshAccessToken';
import { MutationResolvers } from '../../../../../shared/infra/graphql/generated/typed-schema';
import { UserInputError } from 'apollo-server-express';

export const resolvers = {
  Mutation: {
    async login(_, { data }) {
      const dataOrError = await loginUseCase.execute(data);
      if (dataOrError.isError) {
        throw new UserInputError(dataOrError.getError());
      }

      //set on cookie the refresh token
      return dataOrError.getValue();
    },
    async register(_, { data }) {
      const userOrError = await createUserUseCase.execute(data);
      if (userOrError.isError) {
        throw new UserInputError(userOrError.getError());
      }

      return userOrError.getValue();
    },
    async refreshToken() {
      //get refresh token from cookie
      const tokensOrError = await refreshAccessTokenUseCase.execute({ refreshToken: '' });
      if (tokensOrError.isError) {
        throw new UserInputError(tokensOrError.getError());
      }

      //set on cookie the refresh token
      return tokensOrError.getValue().accessToken;
    },
  } as MutationResolvers,
};
