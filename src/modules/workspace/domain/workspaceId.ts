import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';

export class WorkspaceId extends Entity<unknown> {
  get value(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): Result<WorkspaceId> {
    return Result.success<WorkspaceId>(new WorkspaceId(id));
  }
}
