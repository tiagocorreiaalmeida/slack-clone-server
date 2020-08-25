import { ValueObject } from '../../../shared/domain/ValueObject';
import { validator } from '../../../shared/utils/validator';
import { Result } from '../../../shared/core/Result';

interface ChannelNameProps {
  value: string;
}

export const CHANNEL_NAME_MIN_LENGTH = 1;
export const CHANNEL_NAME_MAX_LENGTH = 80;
export const INVALID_CHANNEL_NAME_ERROR = `The channel name must have between ${CHANNEL_NAME_MIN_LENGTH} and ${CHANNEL_NAME_MAX_LENGTH} characters.`;

export class ChannelName extends ValueObject<ChannelNameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: ChannelNameProps) {
    super(props);
  }

  static create(props: ChannelNameProps): Result<ChannelName> {
    const isValidChannelName = validator.isLength({
      value: props.value,
      min: CHANNEL_NAME_MIN_LENGTH,
      max: CHANNEL_NAME_MAX_LENGTH,
    });

    if (!isValidChannelName) {
      return Result.fail<ChannelName>(INVALID_CHANNEL_NAME_ERROR);
    }

    return Result.success<ChannelName>(new ChannelName(props));
  }
}
