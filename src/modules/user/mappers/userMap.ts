import { Mapper } from '../../../shared/infra/Mapper';
import { User } from '../domain/user';
import {
  UserCreationAttributes,
  UserAttributes,
} from '../../../shared/infra/database/sequelize/models/User';
import { UserPassword } from '../domain/userPassword';
import { UserEmail } from '../domain/userEmail';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

export class UserMap implements Mapper<User> {
  static toPersistance(user: User): UserCreationAttributes {
    return {
      id: user.userId.value.toString(),
      email: user.email.value,
      password: user.password.isAlreadyHashed()
        ? user.password.value
        : user.password.getHashedValue(),
    };
  }
  static toDomain(user: UserAttributes): User {
    const userPasswordOrError = UserPassword.create({ value: user.password, hashed: true });
    const userEmailOrError = UserEmail.create({ value: user.email });

    const userOrError = User.create(
      {
        email: userEmailOrError.getValue(),
        password: userPasswordOrError.getValue(),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      new UniqueEntityID(user.id),
    );

    return userOrError.getValue();
  }
}
