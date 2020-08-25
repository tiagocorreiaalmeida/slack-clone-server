import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { MemberId } from './memberId';
import { ChannelId } from './channelId';

interface ChannelMemberProps {
  memberId: MemberId;
  channelId: ChannelId;
  addedBy: MemberId;
  addedAt: Date;
}

export class ChannelMember extends Entity<ChannelMemberProps> {
  private constructor(props: ChannelMemberProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get memberId(): MemberId {
    return this.props.memberId;
  }

  get channelId(): ChannelId {
    return this.props.channelId;
  }

  get addedBy(): MemberId {
    return this.props.addedBy;
  }

  get addedAt(): Date {
    return this.props.addedAt;
  }

  static create(props: ChannelMemberProps, id?: UniqueEntityID): Result<ChannelMember> {
    const workspace = new ChannelMember(props, id);

    return Result.success<ChannelMember>(workspace);
  }
}
