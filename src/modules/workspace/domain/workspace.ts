import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { WorkspaceName } from './workspaceName';
import { UserId } from '../../user/domain/userId';
import { WorkspaceId } from './workspaceId';

interface WorkspaceProps {
  name: WorkspaceName;
  ownerId: UserId;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateWorkspaceProps {
  name: WorkspaceName;
  ownerId: UserId;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Workspace extends Entity<WorkspaceProps> {
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

  static create(props: CreateWorkspaceProps, id?: UniqueEntityID): Result<Workspace> {
    const workspace = new Workspace(
      {
        ...props,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    );

    return Result.success<Workspace>(workspace);
  }
}
