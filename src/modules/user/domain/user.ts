import { Entity } from '../../../shared/domain/Entity';
import { UserEmail } from './userEmail';
import { UserDisplayName } from './userDisplayName';
import { UserPassword } from './userPassword';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { UserName } from './userName';
import { UserId } from './userId';

interface UserProps {
  email: UserEmail;
  username: UserName;
  displayName?: UserDisplayName;
  password: UserPassword;
  isVerified: boolean;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateUserProps {
  email: UserEmail;
  username: UserName;
  displayName?: UserDisplayName;
  password: UserPassword;
  isVerified?: boolean;
  isActive?: boolean;
  isAdmin?: boolean;
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

  get username(): UserName {
    return this.props.username;
  }

  get displayName(): UserDisplayName | undefined {
    return this.props.displayName;
  }

  get isVerified(): boolean {
    return !!this.props.isVerified;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get isAdmin(): boolean {
    return this.props.isAdmin;
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

  static create(props: CreateUserProps, id?: UniqueEntityID): Result<User> {
    const user = new User(
      {
        ...props,
        isAdmin: !!props.isAdmin,
        isActive: !!props.isActive,
        isVerified: !!props.isVerified,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    );

    return Result.success<User>(user);
  }
}
