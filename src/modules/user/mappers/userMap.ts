import { Mapper } from '../../../shared/infra/Mapper';
import { User } from '../domain/user';
import {
  UserCreationAttributes,
  UserAttributes,
} from '../../../shared/infra/database/sequelize/models/User';
import { UserName } from '../domain/userName';
import { UserPassword } from '../domain/userPassword';
import { UserEmail } from '../domain/userEmail';
import { UserDisplayName } from '../domain/userDisplayName';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';

export class UserMap implements Mapper<User> {
  static toPersistance(user: User): UserCreationAttributes {
    return {
      id: user.userId.value.toValue(),
      username: user.username.value,
      email: user.username.value,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
      displayName: user.displayName?.value || null,
      isVerified: user.isVerified,
      password: user.password.isAlreadyHashed()
        ? user.password.value
        : user.password.getHashedValue(),
    };
  }
  static toDomain(user: UserAttributes): User {
    const userNameOrError = UserName.create({ value: user.username });
    const userPasswordOrError = UserPassword.create({ value: user.password, hashed: true });
    const userEmailOrError = UserEmail.create({ value: user.email });
    const displayName = user.displayName
      ? UserDisplayName.create({ value: user.displayName }).getValue()
      : undefined;

    const userOrError = User.create(
      {
        email: userEmailOrError.getValue(),
        password: userPasswordOrError.getValue(),
        username: userNameOrError.getValue(),
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        displayName,
      },
      new UniqueEntityID(user.id),
    );

    return userOrError.getValue();
  }
}
