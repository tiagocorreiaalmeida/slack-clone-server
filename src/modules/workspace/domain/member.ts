import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { UserId } from '../../user/domain/userId';
import { WorkspaceId } from './workspaceId';
import { MemberFullName } from './memberFullName';
import { MemberDisplayName } from './memberDisplayName';

interface MemberProps {
  userId: UserId;
  workspaceId: WorkspaceId;
  fullName: MemberFullName;
  displayName: MemberDisplayName | null;
  isAdmin: boolean;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMemberProps {
  userId: UserId;
  workspaceId: WorkspaceId;
  fullName: MemberFullName;
  displayName?: MemberDisplayName;
  isAdmin?: boolean;
  isActive?: boolean;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Member extends Entity<MemberProps> {
  private constructor(props: MemberProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get workspaceId(): WorkspaceId {
    return this.props.workspaceId;
  }

  get fullName(): MemberFullName {
    return this.props.fullName;
  }

  get displayName(): MemberDisplayName | null {
    return this.props.displayName || null;
  }

  get isVerified(): boolean {
    return this.props.isVerified;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get isAdmin(): boolean {
    return this.props.isAdmin;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updateAt(): Date {
    return this.props.updatedAt;
  }

  static create(props: CreateMemberProps, id?: UniqueEntityID): Result<Member> {
    const workspace = new Member(
      {
        ...props,
        displayName: props.displayName || null,
        isAdmin: !!props.isAdmin,
        isActive: props.isActive === undefined ? true : props.isActive,
        isVerified: !!props.isVerified,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    );

    return Result.success<Member>(workspace);
  }
}
