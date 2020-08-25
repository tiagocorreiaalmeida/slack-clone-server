import { ValueObject } from '../../../shared/domain/ValueObject';
import { validator } from '../../../shared/utils/validator';
import { Result } from '../../../shared/core/Result';

interface ChannelSubjectProps {
  value: string;
}

export const CHANNEL_SUBJECT_MIN_LENGTH = 1;
export const CHANNEL_SUBJECT_MAX_LENGTH = 250;
export const INVALID_CHANNEL_SUBJECT_ERROR = `The channel subject can have between ${CHANNEL_SUBJECT_MIN_LENGTH} and ${CHANNEL_SUBJECT_MAX_LENGTH} characters.`;

export class ChannelSubject extends ValueObject<ChannelSubjectProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: ChannelSubjectProps) {
    super(props);
  }

  static create(props: ChannelSubjectProps): Result<ChannelSubject> {
    const isValidChannelSubject = validator.isLength({
      value: props.value,
      min: CHANNEL_SUBJECT_MIN_LENGTH,
      max: CHANNEL_SUBJECT_MAX_LENGTH,
    });

    if (!isValidChannelSubject) {
      return Result.fail<ChannelSubject>(INVALID_CHANNEL_SUBJECT_ERROR);
    }

    return Result.success<ChannelSubject>(new ChannelSubject(props));
  }
}
