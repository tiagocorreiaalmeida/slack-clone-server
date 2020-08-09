import { ValueObject } from '../../../shared/domain/ValueObject';
import { validator } from '../../../shared/utils/validator';
import { Result } from '../../../shared/core/Result';

export const INVALID_EMAIL_ERROR = 'Email address not valid';

interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserEmailProps) {
    super(props);
  }

  static create(props: UserEmailProps): Result<UserEmail> {
    const isValidEmail = validator.isEmail(props.value);
    if (!isValidEmail) {
      return Result.fail<UserEmail>(INVALID_EMAIL_ERROR);
    }

    return Result.success<UserEmail>(new UserEmail(props));
  }
}
