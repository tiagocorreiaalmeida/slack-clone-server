import { UseCase } from '../../../../shared/core/UseCase';
import { CreateUserDTO } from './createWorkspaceDTO';
import { Result } from '../../../../shared/core/Result';
import { Workspace } from '../../domain/workspace';
import { WorkspaceName } from '../../domain/workspaceName';
import { UserRepo } from '../../../user/domain/userRepo';
import { WorkspaceRepo } from '../../domain/workspaceRepo';
import { USER_NOT_FOUND } from './createWorkspaceErrors';

export class CreateWorkspaceUseCase implements UseCase<CreateUserDTO, Result<Workspace>> {
  constructor(private userRepo: UserRepo, private workspaceRepo: WorkspaceRepo) {}

  async execute(request: CreateUserDTO): Promise<Result<Workspace>> {
    const nameOrError = WorkspaceName.create({ value: request.name });

    if (nameOrError.isError) {
      return Result.fail<Workspace>(nameOrError.getError());
    }

    const name = nameOrError.getValue();

    const user = await this.userRepo.findById(request.ownerId);

    if (!user) {
      return Result.fail<Workspace>(USER_NOT_FOUND);
    }

    const workspaceOrError = Workspace.create({ name, ownerId: user.userId });

    if (workspaceOrError.isError) {
      return Result.fail<Workspace>(workspaceOrError.getError());
    }

    const workspace = workspaceOrError.getValue();

    await this.workspaceRepo.save(workspace);

    return Result.success<Workspace>(workspace);

    //create member with is admin as true
    //create geral channel on workspace
  }
}
