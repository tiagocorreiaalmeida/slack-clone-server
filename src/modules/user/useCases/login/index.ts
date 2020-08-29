import { LoginUseCase } from './login';
import { userRepo } from '../../infra/repos';
import { authService } from '../../services';

export const loginUseCase = new LoginUseCase(userRepo, authService);
