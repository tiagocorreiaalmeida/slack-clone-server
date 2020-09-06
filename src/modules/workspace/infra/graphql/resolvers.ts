import { MutationResolvers } from '../../../../shared/infra/graphql/generated/typed-schema';
import { UserInputError } from 'apollo-server-express';

export const resolvers = {
  Mutation: {
    async createWorkspace(_, { data }, { useCases, userId }: GraphQLModules.Context) {
      const workspaceOrError = await useCases.workspace.createWorkspace.execute({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ownerId: userId!,
        ...data,
      });
      if (workspaceOrError.isError) {
        throw new UserInputError(workspaceOrError.getError());
      }

      return workspaceOrError.getValue();
    },
  } as MutationResolvers,
};
