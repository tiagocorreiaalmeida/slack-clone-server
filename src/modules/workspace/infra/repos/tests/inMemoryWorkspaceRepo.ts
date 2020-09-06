import { WorkspaceRepo as IWorkspaceRepo } from '../../../domain/repos/workspaceRepo';
import { Workspace } from '../../../domain/workspace';

export class InMemoryWorkspaceRepo implements IWorkspaceRepo {
  workspaces: Workspace[];
  constructor() {
    this.workspaces = [];
  }

  async save(workspace: Workspace): Promise<Workspace> {
    this.workspaces.push(workspace);
    return workspace;
  }
}

export const WorkspaceRepo = new InMemoryWorkspaceRepo();
