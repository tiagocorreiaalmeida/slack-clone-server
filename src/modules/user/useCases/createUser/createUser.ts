import { UseCase } from '../../../../shared/core/UseCase';
import { CreateUserDTO, CreateUserDTOResponse } from './createUserDTO';
import { UserEmail } from '../../domain/userEmail';
import { UserPassword } from '../../domain/userPassword';
import { User } from '../../domain/user';
import { Result } from '../../../../shared/core/Result';
import { UserRepo } from '../../domain/repos/userRepo';
import { EMAIL_TAKEN_ERROR } from './createUserErrors';
import { UserMap } from '../../mappers/userMap';

export class CreateUserUseCase implements UseCase<CreateUserDTO, Result<CreateUserDTOResponse>> {
  constructor(private userRepo: UserRepo) {}

  async execute(request: CreateUserDTO): Promise<Result<CreateUserDTOResponse>> {
    const emailOrError = UserEmail.create({ value: request.email });
    const passwordOrError = UserPassword.create({ value: request.password });

    const dtoResult = Result.combine([emailOrError, passwordOrError]);
    if (dtoResult.isError) {
      return Result.fail<CreateUserDTOResponse>(dtoResult.getError());
    }

    const email = emailOrError.getValue();
    const password = passwordOrError.getValue();

    const userExists = await this.userRepo.findByEmail(email);
    if (userExists) {
      return Result.fail<CreateUserDTOResponse>(EMAIL_TAKEN_ERROR);
    }

    const userOrError = User.create({ email, password, isVerified: true });

    if (userOrError.isError) {
      return Result.fail<CreateUserDTOResponse>(userOrError.getError());
    }

    const user = userOrError.getValue();

    await this.userRepo.save(user);

    return Result.success<CreateUserDTOResponse>(UserMap.toDTO(user));
  }
}
