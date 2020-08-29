import { RefreshTokenUseCase } from './refreshAccessToken';
import { userRepo } from '../../infra/repos';
import { authService } from '../../services';

export const refreshAccessTokenUseCase = new RefreshTokenUseCase(userRepo, authService);
