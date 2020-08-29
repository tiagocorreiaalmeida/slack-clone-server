import { UseCase } from '../../../../shared/core/UseCase';
import { LoginDTO, LoginDTOResponse } from './loginDTO';
import { UserEmail } from '../../domain/userEmail';
import { UserPassword } from '../../domain/userPassword';
import { Result } from '../../../../shared/core/Result';
import { UserRepo } from '../../domain/repos/userRepo';
import { AUTHENTICATION_FAILED, ACCOUNT_NOT_VERIFIED } from './loginErrors';
import { UserMap } from '../../mappers/userMap';
import { AuthService } from '../../services/authService';

export class LoginUseCase implements UseCase<LoginDTO, Result<LoginDTOResponse>> {
  constructor(private userRepo: UserRepo, private authService: AuthService) {}

  async execute(request: LoginDTO): Promise<Result<LoginDTOResponse>> {
    const emailOrError = UserEmail.create({ value: request.email });
    const passwordOrError = UserPassword.create({ value: request.password });

    const dtoResult = Result.combine([emailOrError, passwordOrError]);
    if (dtoResult.isError) {
      return Result.fail<LoginDTOResponse>(dtoResult.getError());
    }

    const email = emailOrError.getValue();
    const password = passwordOrError.getValue();

    const user = await this.userRepo.findByEmail(email);
    const passwordIsValid = user?.password.comparePassword(password.value);

    if (!user || !passwordIsValid) {
      return Result.fail<LoginDTOResponse>(AUTHENTICATION_FAILED);
    }

    if (!user.isVerified) {
      return Result.fail<LoginDTOResponse>(ACCOUNT_NOT_VERIFIED);
    }

    return Result.success<LoginDTOResponse>({
      user: UserMap.toDTO(user),
      accessToken: this.authService.createAccessToken({ userId: user.userId.value.toString() }),
      refreshToken: this.authService.createRefreshToken({ userId: user.userId.value.toString() }),
    });
  }
}
