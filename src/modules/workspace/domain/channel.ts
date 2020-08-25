import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { WorkspaceId } from './workspaceId';
import { ChannelName } from './channelName';
import { ChannelDescription } from './channelDescription';
import { ChannelSubject } from './channelSubject';
import { MemberId } from './memberId';

interface ChannelProps {
  workspaceId: WorkspaceId;
  name?: ChannelName;
  description?: ChannelDescription;
  subject?: ChannelSubject;
  creatorId: MemberId;
  isPrivate: boolean;
  isDirectMessage: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateChannelProps {
  workspaceId: WorkspaceId;
  name?: ChannelName;
  description?: ChannelDescription;
  subject?: ChannelSubject;
  creatorId: MemberId;
  isPrivate?: boolean;
  isDirectMessage?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Channel extends Entity<ChannelProps> {
  private constructor(props: ChannelProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): ChannelName | undefined {
    return this.props.name;
  }

  get description(): ChannelDescription | undefined {
    return this.props.description;
  }

  get subject(): ChannelSubject | undefined {
    return this.props.subject;
  }

  get creatorId(): MemberId {
    return this.props.creatorId;
  }

  get workspaceId(): WorkspaceId {
    return this.props.workspaceId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updateAt(): Date {
    return this.props.updatedAt;
  }

  get isPrivate(): boolean {
    return this.props.isPrivate;
  }

  get isDirect(): boolean {
    return this.props.isDirectMessage;
  }

  static create(props: CreateChannelProps, id?: UniqueEntityID): Result<Channel> {
    const { isDirectMessage } = props;
    const workspace = new Channel(
      {
        ...props,
        name: isDirectMessage ? undefined : props.name,
        description: isDirectMessage ? undefined : props.description,
        subject: isDirectMessage ? undefined : props.subject,
        isDirectMessage: !!isDirectMessage,
        isPrivate: !!props.isPrivate,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    );

    return Result.success<Channel>(workspace);
  }
}
