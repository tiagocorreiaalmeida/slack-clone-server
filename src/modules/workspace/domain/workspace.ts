import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { WorkspaceName } from './workspaceName';
import { UserId } from '../../user/domain/userId';

interface WorkspaceProps {
  name: WorkspaceName;
  owner: UserId;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateWorkspaceProps {
  name: WorkspaceName;
  owner: UserId;
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

  get id(): UniqueEntityID {
    return this._id;
  }

  get owner(): UserId {
    return this.props.owner;
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
