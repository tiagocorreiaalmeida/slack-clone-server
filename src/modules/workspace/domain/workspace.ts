import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { WorkspaceName } from './workspaceName';
import { UserId } from '../../user/domain/userId';
import { WorkspaceId } from './workspaceId';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { Channel } from './channel';
import { Member } from './member';

interface WorkspaceProps {
  name: WorkspaceName;
  ownerId: UserId;
  channels: Channel[];
  members: Member[];
  createdAt: Date;
  updatedAt: Date;
}

interface CreateWorkspaceProps {
  name: WorkspaceName;
  ownerId: UserId;
  channels?: Channel[];
  members?: Member[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class Workspace extends AggregateRoot<WorkspaceProps> {
  private constructor(props: WorkspaceProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get name(): WorkspaceName {
    return this.props.name;
  }

  get workspaceId(): WorkspaceId {
    return WorkspaceId.create(this._id).getValue();
  }

  get ownerId(): UserId {
    return this.props.ownerId;
  }

  get channels(): Channel[] {
    return this.props.channels;
  }

  get members(): Member[] {
    return this.props.members;
  }

  private removeChannelIfExists(channelToRemove: Channel): void {
    this.props.channels = this.props.channels.filter(
      (channel) => !channel.id.equals(channelToRemove.id),
    );
  }

  addChanel(channel: Channel): void {
    this.removeChannelIfExists(channel);
    this.props.channels.push(channel);
  }

  private removeMemberIfExists(memberToRemove: Member): void {
    this.props.members = this.props.members.filter(
      (member) => !member.id.equals(memberToRemove.id),
    );
  }

  addMember(member: Member): void {
    this.removeMemberIfExists(member);
    this.props.members.push(member);
  }

  static create(props: CreateWorkspaceProps, id?: UniqueEntityID): Result<Workspace> {
    const workspace = new Workspace(
      {
        ...props,
        channels: props.channels || [],
        members: props.members || [],
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    );

    return Result.success<Workspace>(workspace);
  }
}
