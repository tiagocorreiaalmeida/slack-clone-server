import { UseCase } from '../../../../shared/core/UseCase';
import { CreateWorkspaceDTO, CreateWorkspaceDTOResponse } from './createWorkspaceDTO';
import { Result } from '../../../../shared/core/Result';
import { Workspace } from '../../domain/workspace';
import { WorkspaceName } from '../../domain/workspaceName';
import { UserRepo } from '../../../user/domain/repos/userRepo';
import { WorkspaceRepo } from '../../domain/repos/workspaceRepo';
import { MemberRepo } from '../../domain/repos/memberRepo';
import { USER_NOT_FOUND } from './createWorkspaceErrors';
import { WorkspaceMap } from '../../mappers/workspaceMap';
import { Member } from '../../domain/member';
import { MemberFullName } from '../../domain/memberFullName';

export class CreateWorkspaceUseCase
  implements UseCase<CreateWorkspaceDTO, Result<CreateWorkspaceDTOResponse>> {
  constructor(
    private userRepo: UserRepo,
    private workspaceRepo: WorkspaceRepo,
    private memberRepo: MemberRepo,
  ) {}

  async execute(request: CreateWorkspaceDTO): Promise<Result<CreateWorkspaceDTOResponse>> {
    const nameOrError = WorkspaceName.create({ value: request.name });

    if (nameOrError.isError) {
      return Result.fail<CreateWorkspaceDTOResponse>(nameOrError.getError());
    }

    const name = nameOrError.getValue();

    const user = await this.userRepo.findById(request.ownerId);

    if (!user) {
      return Result.fail<CreateWorkspaceDTOResponse>(USER_NOT_FOUND);
    }

    const workspaceOrError = Workspace.create({
      name,
      ownerId: user.userId,
    });

    if (workspaceOrError.isError) {
      return Result.fail<CreateWorkspaceDTOResponse>(workspaceOrError.getError());
    }

    const workspace = workspaceOrError.getValue();

    const adminMember = Member.create({
      userId: user.userId,
      workspaceId: workspace.workspaceId,
      isAdmin: true,
      //A better approach should be implemented for the future
      fullName: MemberFullName.create({ value: user.email.value.split('@')[0] }).getValue(),
      isActive: true,
      isVerified: true,
    }).getValue();

    //TODO: Add transaction to ensure data integrity
    await this.workspaceRepo.save(workspace);
    await this.memberRepo.save(adminMember);

    return Result.success<CreateWorkspaceDTOResponse>(WorkspaceMap.toDTO(workspace));
  }
}
