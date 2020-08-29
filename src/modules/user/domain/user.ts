import { Entity } from '../../../shared/domain/Entity';
import { UserEmail } from './userEmail';
import { UserPassword } from './userPassword';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { UserId } from './userId';

interface UserProps {
  email: UserEmail;
  password: UserPassword;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateUserProps {
  email: UserEmail;
  password: UserPassword;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get userId(): UserId {
    return UserId.create(this._id).getValue();
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updateAt(): Date {
    return this.props.updatedAt;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get isVerified(): boolean {
    return this.props.isVerified;
  }

  static create(props: CreateUserProps, id?: UniqueEntityID): Result<User> {
    const user = new User(
      {
        ...props,
        isVerified: !!props.isVerified,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    );

    return Result.success<User>(user);
  }
}
