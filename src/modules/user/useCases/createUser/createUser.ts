import { UseCase } from '../../../../shared/core/UseCase';
import { CreateUserDTO } from './createUserDTO';
import { UserEmail } from '../../domain/userEmail';
import { UserPassword } from '../../domain/userPassword';
import { User } from '../../domain/user';
import { Result } from '../../../../shared/core/Result';
import { UserRepo } from '../../domain/userRepo';
import { EMAIL_TAKEN_ERROR } from './createUserErrors';

export class CreateUserUseCase implements UseCase<CreateUserDTO, Result<User>> {
  constructor(private userRepo: UserRepo) {}

  async execute(request: CreateUserDTO): Promise<Result<User>> {
    const emailOrError = UserEmail.create({ value: request.email });
    const passwordOrError = UserPassword.create({ value: request.password });

    const dtoResult = Result.combine([emailOrError, passwordOrError]);
    if (dtoResult.isError) {
      return Result.fail<User>(dtoResult.getError());
    }

    const email = emailOrError.getValue();
    const password = passwordOrError.getValue();

    const userExists = await this.userRepo.findByEmail(email);
    if (userExists) {
      return Result.fail<User>(EMAIL_TAKEN_ERROR);
    }

    const userOrError = User.create({ email, password });

    if (userOrError.isError) {
      return Result.fail<User>(userOrError.getError());
    }

    const user = userOrError.getValue();

    await this.userRepo.save(user);

    return Result.success<User>(user);
  }
}
