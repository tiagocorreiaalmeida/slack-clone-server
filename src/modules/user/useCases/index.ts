import { CreateUserUseCase } from './createUser/createUser';
import { LoginUseCase } from './login/login';
import { RefreshAccessTokenUseCase } from './refreshAccessToken/refreshAccessToken';
import { UserRepo } from '../domain/repos/userRepo';
import { AuthService } from '../services/auth/authService';

export type UserUseCases = (
  userRepo: UserRepo,
  authService: AuthService,
) => {
  createUser: CreateUserUseCase;
  login: LoginUseCase;
  refreshAccessToken: RefreshAccessTokenUseCase;
};

export const userUseCases: UserUseCases = (userRepo, authService) => ({
  createUser: new CreateUserUseCase(userRepo),
  login: new LoginUseCase(userRepo, authService),
  refreshAccessToken: new RefreshAccessTokenUseCase(userRepo, authService),
});
