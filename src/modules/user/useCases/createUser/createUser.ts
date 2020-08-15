import { UseCase } from '../../../../shared/core/UseCase';
import { CreateUserDTO } from './createUserDTO';
import { UserEmail } from '../../domain/userEmail';
import { UserPassword } from '../../domain/userPassword';
import { UserName } from '../../domain/userName';
import { User } from '../../domain/user';
import { Result } from '../../../../shared/core/Result';
import { UserRepo } from '../../domain/userRepo';
import { EMAIL_TAKEN_ERROR, USERNAME_TAKEN_ERROR } from './createUserErrors';

export class CreateUserUseCase implements UseCase<CreateUserDTO, Result<User>> {
  constructor(private userRepo: UserRepo) {}

  async execute(request: CreateUserDTO): Promise<Result<User>> {
    const emailOrError = UserEmail.create({ value: request.email });
    const passwordOrError = UserPassword.create({ value: request.password });
    const usernameOrError = UserName.create({ value: request.username });

    const dtoResult = Result.combine([emailOrError, passwordOrError, usernameOrError]);
    if (dtoResult.isError) {
      return Result.fail<User>(dtoResult.getError());
    }

    const email = emailOrError.getValue();
    const password = passwordOrError.getValue();
    const username = usernameOrError.getValue();

    const userExists = await this.userRepo.findByEmailOrUsername(email, username);
    if (userExists) {
      if (userExists.email.value === email.value) {
        return Result.fail<User>(EMAIL_TAKEN_ERROR);
      }
      return Result.fail<User>(USERNAME_TAKEN_ERROR);
    }

    const userOrError = User.create({ email, password, username });

    if (userOrError.isError) {
      return Result.fail<User>(userOrError.getError());
    }

    const user = userOrError.getValue();

    const persistedUser = await this.userRepo.save(user);
    return Result.success<User>(persistedUser);
  }
}
