import { CreateWorkspaceUseCase } from './createWorkspace/createWorkspace';

import { UserRepo } from '../../user/domain/repos/userRepo';
import { WorkspaceRepo } from '../domain/repos/workspaceRepo';
import { MemberRepo } from '../domain/repos/memberRepo';

export type WorkspaceUseCases = (
  userRepo: UserRepo,
  workspaceRepo: WorkspaceRepo,
  memberRepo: MemberRepo,
) => {
  createWorkspace: CreateWorkspaceUseCase;
};

export const workspaceUseCases: WorkspaceUseCases = (userRepo, workspaceRepo, memberRepo) => ({
  createWorkspace: new CreateWorkspaceUseCase(userRepo, workspaceRepo, memberRepo),
});
