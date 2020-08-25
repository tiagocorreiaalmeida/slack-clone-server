import { ValueObject } from '../../../shared/domain/ValueObject';
import { validator } from '../../../shared/utils/validator';
import { Result } from '../../../shared/core/Result';

interface ChannelDescriptionProps {
  value: string;
}

export const CHANNEL_DESCRIPTION_MIN_LENGTH = 1;
export const CHANNEL_DESCRIPTION_MAX_LENGTH = 250;
export const INVALID_CHANNEL_DESCRIPTION_ERROR = `The channel description can have between ${CHANNEL_DESCRIPTION_MIN_LENGTH} and ${CHANNEL_DESCRIPTION_MAX_LENGTH} characters.`;

export class ChannelDescription extends ValueObject<ChannelDescriptionProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: ChannelDescriptionProps) {
    super(props);
  }

  static create(props: ChannelDescriptionProps): Result<ChannelDescription> {
    const isValidChannelDescription = validator.isLength({
      value: props.value,
      min: CHANNEL_DESCRIPTION_MIN_LENGTH,
      max: CHANNEL_DESCRIPTION_MAX_LENGTH,
    });

    if (!isValidChannelDescription) {
      return Result.fail<ChannelDescription>(INVALID_CHANNEL_DESCRIPTION_ERROR);
    }

    return Result.success<ChannelDescription>(new ChannelDescription(props));
  }
}
