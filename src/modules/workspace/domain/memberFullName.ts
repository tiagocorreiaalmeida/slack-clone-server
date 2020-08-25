import { ValueObject } from '../../../shared/domain/ValueObject';
import { validator } from '../../../shared/utils/validator';
import { Result } from '../../../shared/core/Result';

interface MemberFullNameProps {
  value: string;
}

export const MEMBER_FULL_NAME_MIN_LENGTH = 1;
export const MEMBER_FULL_NAME_MAX_LENGTH = 80;
export const INVALID_MEMBER_FULL_NAME_ERROR = `The full name must have between ${MEMBER_FULL_NAME_MIN_LENGTH} and ${MEMBER_FULL_NAME_MAX_LENGTH} characters.`;

export class MemberFullName extends ValueObject<MemberFullNameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: MemberFullNameProps) {
    super(props);
  }

  static create(props: MemberFullNameProps): Result<MemberFullName> {
    const isValidMemberFullName = validator.isLength({
      value: props.value,
      min: MEMBER_FULL_NAME_MIN_LENGTH,
      max: MEMBER_FULL_NAME_MAX_LENGTH,
    });

    if (!isValidMemberFullName) {
      return Result.fail<MemberFullName>(INVALID_MEMBER_FULL_NAME_ERROR);
    }

    return Result.success<MemberFullName>(new MemberFullName(props));
  }
}
