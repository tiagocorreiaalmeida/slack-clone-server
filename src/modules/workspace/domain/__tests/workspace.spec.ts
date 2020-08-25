import { Workspace } from '../workspace';
import { WorkspaceName, WORKSPACE_NAME_MIN_LENGTH } from '../workspaceName';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
import { UserId } from '../../../user/domain/userId';

describe('Workspace', () => {
  describe('create', () => {
    const name = WorkspaceName.create({
      value: 'a'.repeat(WORKSPACE_NAME_MIN_LENGTH),
    }).getValue();
    const ownerId = UserId.create().getValue();
    const workspaceData = {
      name,
      ownerId,
    };

    it('should return a user', () => {
      const workspaceId = new UniqueEntityID();
      const workspace = Workspace.create(workspaceData, workspaceId);

      expect(workspace.isError).toBeFalsy();
      expect(workspace.getValue().name).toEqual(workspaceData.name);
      expect(workspace.getValue().workspaceId.value).toEqual(workspaceId);
      expect(workspace.getValue().ownerId.value).toEqual(ownerId.value);
    });

    it('should return a new workspace with id when one is not provided', () => {
      const workspace = Workspace.create(workspaceData);

      expect(workspace.isError).toBeFalsy();
      expect(workspace.getValue().name).toEqual(workspaceData.name);
      expect(workspace.getValue().workspaceId.value).toBeDefined();
    });
  });
});
