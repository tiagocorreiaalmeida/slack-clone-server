import { Workspace } from './workspace';

export interface WorkspaceRepo {
  save(workspace: Workspace): Promise<Workspace>;
}
