import { ValueObject } from '../../../shared/domain/ValueObject';
import { validator } from '../../../shared/utils/validator';
import { Result } from '../../../shared/core/Result';

interface UserDisplayNameProps {
  value: string;
}

export const DISPLAY_NAME_MIN_LENGTH = 5;
export const DISPLAY_NAME_MAX_LENGTH = 100;
export const INVALID_DISPLAY_NAME_ERROR = `User Display Name should be between ${DISPLAY_NAME_MIN_LENGTH} and ${DISPLAY_NAME_MAX_LENGTH} characters.`;

export class UserDisplayName extends ValueObject<UserDisplayNameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserDisplayNameProps) {
    super(props);
  }

  static create(props: UserDisplayNameProps): Result<UserDisplayName> {
    const isValidDisplayName = validator.isLength({
      value: props.value,
      min: DISPLAY_NAME_MIN_LENGTH,
      max: DISPLAY_NAME_MAX_LENGTH,
    });

    if (!isValidDisplayName) return Result.fail<UserDisplayName>(INVALID_DISPLAY_NAME_ERROR);

    return Result.success<UserDisplayName>(new UserDisplayName(props));
  }
}
