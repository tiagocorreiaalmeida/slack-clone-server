import { ValueObject } from '../../../shared/domain/ValueObject';
import { validator } from '../../../shared/utils/validator';
import { Result } from '../../../shared/core/Result';

interface MemberDisplayNameProps {
  value: string;
}

export const MEMBER_DISPLAY_NAME_MIN_LENGTH = 1;
export const MEMBER_DISPLAY_NAME_MAX_LENGTH = 80;
export const INVALID_MEMBER_DISPLAY_NAME_ERROR = `The display name must have between ${MEMBER_DISPLAY_NAME_MIN_LENGTH} and ${MEMBER_DISPLAY_NAME_MAX_LENGTH} characters.`;

export class MemberDisplayName extends ValueObject<MemberDisplayNameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: MemberDisplayNameProps) {
    super(props);
  }

  static create(props: MemberDisplayNameProps): Result<MemberDisplayName> {
    const isValidMemberDisplayName = validator.isLength({
      value: props.value,
      min: MEMBER_DISPLAY_NAME_MIN_LENGTH,
      max: MEMBER_DISPLAY_NAME_MAX_LENGTH,
    });

    if (!isValidMemberDisplayName) {
      return Result.fail<MemberDisplayName>(INVALID_MEMBER_DISPLAY_NAME_ERROR);
    }

    return Result.success<MemberDisplayName>(new MemberDisplayName(props));
  }
}
