import { Mapper } from '../../../shared/infra/Mapper';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { WorkspaceDTO } from '../dtos/workspaceDTO';
import { Workspace } from '../domain/workspace';
import {
  WorkspaceAttributes,
  WorkspaceCreationAttributes,
} from '../../../shared/infra/database/sequelize/models/Workspace';
import { WorkspaceName } from '../domain/workspaceName';
import { WorkspaceId } from '../domain/workspaceId';

export class WorkspaceMap implements Mapper<Workspace> {
  static toPersistance(workspace: Workspace): WorkspaceCreationAttributes {
    return {
      id: workspace.id.toString(),
      name: workspace.name.value,
      ownerId: workspace.ownerId.value.toString(),
    };
  }
  static toDomain(workspace: WorkspaceAttributes): Workspace {
    const nameOrError = WorkspaceName.create({ value: workspace.name });
    const ownerIdOrError = WorkspaceId.create(new UniqueEntityID(workspace.ownerId));

    const workspaceOrError = Workspace.create(
      {
        createdAt: workspace.createdAt,
        updatedAt: workspace.updatedAt,
        name: nameOrError.getValue(),
        ownerId: ownerIdOrError.getValue(),
      },
      new UniqueEntityID(workspace.id),
    );

    return workspaceOrError.getValue();
  }
  static toDTO(workspace: Workspace): WorkspaceDTO {
    return {
      id: workspace.workspaceId.value.toString(),
      name: workspace.name.value,
      ownerId: workspace.ownerId.value.toString(),
    };
  }
}
