import { WorkspaceDTO } from '../../dtos/workspaceDTO';

export interface CreateWorkspaceDTO {
  ownerId: string;
  name: string;
}

export type CreateWorkspaceDTOResponse = WorkspaceDTO;
