import { userUseCases } from '../modules/user/useCases';
import { authService } from '../modules/user/services';
/* import { UserRepo } from '../modules/user/infra/repos/sequelizeUserRepo'; */
import { UserRepo } from '../modules/user/infra/repos/tests/inMemoryUserRepo';

export interface UseCases {
  user: ReturnType<typeof userUseCases>;
}

type UseCasesBootstrap = () => UseCases;

export const useCasesBootstrap: UseCasesBootstrap = () => ({
  user: userUseCases(UserRepo, authService),
});
