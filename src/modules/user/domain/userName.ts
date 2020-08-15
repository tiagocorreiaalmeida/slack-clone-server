import { ValueObject } from '../../../shared/domain/ValueObject';
import { validator } from '../../../shared/utils/validator';
import { Result } from '../../../shared/core/Result';

interface UserNameProps {
  value: string;
}

export const USER_NAME_MIN_LENGTH = 3;
export const USER_NAME_MAX_LENGTH = 50;
export const INVALID_USER_NAME_ERROR = `User Display Name should be between ${USER_NAME_MIN_LENGTH} and ${USER_NAME_MAX_LENGTH} characters.`;

export class UserName extends ValueObject<UserNameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserNameProps) {
    super(props);
  }

  static create(props: UserNameProps): Result<UserName> {
    const isValidUserName = validator.isLength({
      value: props.value,
      min: USER_NAME_MIN_LENGTH,
      max: USER_NAME_MAX_LENGTH,
    });

    if (!isValidUserName) {
      return Result.fail<UserName>(INVALID_USER_NAME_ERROR);
    }

    return Result.success<UserName>(new UserName(props));
  }
}
