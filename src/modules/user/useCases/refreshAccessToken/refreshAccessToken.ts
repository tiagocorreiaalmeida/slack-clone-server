import { UseCase } from '../../../../shared/core/UseCase';
import { RefreshAccessTokenDTO, RefreshAccessTokenDTOResponse } from './refreshAccessTokenDTO';
import { Result } from '../../../../shared/core/Result';
import { UserRepo } from '../../domain/repos/userRepo';
import { REFRESH_TOKEN_FAILED } from './refreshAccessTokenErrors';
import { AuthService } from '../../services/authService';

export class RefreshAccessTokenUseCase
  implements UseCase<RefreshAccessTokenDTO, Result<RefreshAccessTokenDTOResponse>> {
  constructor(private userRepo: UserRepo, private authService: AuthService) {}

  async execute(request: RefreshAccessTokenDTO): Promise<Result<RefreshAccessTokenDTOResponse>> {
    let userId: string;
    try {
      const tokenData = await this.authService.decodeAccessToken(request.refreshToken);
      userId = tokenData.userId;
    } catch (e) {
      return Result.fail<RefreshAccessTokenDTOResponse>(REFRESH_TOKEN_FAILED);
    }

    const user = await this.userRepo.findById(userId);
    if (!user) {
      return Result.fail<RefreshAccessTokenDTOResponse>(REFRESH_TOKEN_FAILED);
    }

    return Result.success<RefreshAccessTokenDTOResponse>({
      accessToken: this.authService.createAccessToken({ userId: user.userId.value.toString() }),
      refreshToken: this.authService.createRefreshToken({ userId: user.userId.value.toString() }),
    });
  }
}
