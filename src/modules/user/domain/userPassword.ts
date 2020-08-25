import bcrypt from 'bcryptjs';

import { ValueObject } from '../../../shared/domain/ValueObject';
import { validator } from '../../../shared/utils/validator';
import { Result } from '../../../shared/core/Result';

export const PASSWORD_MIN_LENGTH = 5;
export const PASSWORD_MAX_LENGTH = 18;
export const INVALID_PASSWORD_ERROR = `Password must be between ${PASSWORD_MIN_LENGTH} and ${PASSWORD_MAX_LENGTH} characters.`;

interface UserPasswordProps {
  value: string;
  hashed?: boolean;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserPasswordProps) {
    super(props);
  }

  private static hasRequiredLength(password: string): boolean {
    return validator.isLength({
      value: password,
      min: PASSWORD_MIN_LENGTH,
      max: PASSWORD_MAX_LENGTH,
    });
  }

  private hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  isAlreadyHashed(): boolean {
    return !!this.props.hashed;
  }

  public comparePassword(plainTextPassword: string): boolean {
    if (this.isAlreadyHashed()) {
      return bcrypt.compareSync(plainTextPassword, this.props.value);
    } else {
      return plainTextPassword === this.props.value;
    }
  }

  public getHashedValue(): string {
    if (this.isAlreadyHashed()) {
      return this.props.value;
    }
    return this.hashPassword(this.props.value);
  }

  static create(props: UserPasswordProps): Result<UserPassword> {
    if (!props.hashed) {
      if (!this.hasRequiredLength(props.value)) {
        return Result.fail<UserPassword>(INVALID_PASSWORD_ERROR);
      }
    }
    return Result.success<UserPassword>(
      new UserPassword({ value: props.value, hashed: !!props.hashed }),
    );
  }
}
