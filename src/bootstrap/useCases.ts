import { userUseCases } from '../modules/user/useCases';
import { authService } from '../modules/user/services';
/* import { UserRepo } from '../modules/user/infra/repos/sequelizeUserRepo'; */
import { UserRepo } from '../modules/user/infra/repos/tests/inMemoryUserRepo';
import { workspaceUseCases } from '../modules/workspace/useCases';
import { MemberRepo } from '../modules/workspace/infra/repos/tests/inMemoryMemberRepo';
import { WorkspaceRepo } from '../modules/workspace/infra/repos/tests/InMemoryWorkspaceRepo';

export interface UseCases {
  user: ReturnType<typeof userUseCases>;
  workspace: ReturnType<typeof workspaceUseCases>;
}

type UseCasesBootstrap = () => UseCases;

export const useCasesBootstrap: UseCasesBootstrap = () => ({
  user: userUseCases(UserRepo, authService),
  workspace: workspaceUseCases(UserRepo, WorkspaceRepo, MemberRepo),
});
