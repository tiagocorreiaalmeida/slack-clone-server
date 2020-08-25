import {
  WorkspaceName,
  INVALID_WORKSPACE_NAME_ERROR,
  WORKSPACE_NAME_MIN_LENGTH,
  WORKSPACE_NAME_MAX_LENGTH,
} from '../workspaceName';

describe('WorkspaceName', () => {
  describe('create', () => {
    it('should refuse a workspace name length above the allowed range', () => {
      const invalidWorkspaceName = 'a'.repeat(WORKSPACE_NAME_MAX_LENGTH + 1);

      const workspaceName = WorkspaceName.create({ value: invalidWorkspaceName });
      expect(workspaceName.isError).toBeTruthy();
      expect(workspaceName.getError()).toEqual(INVALID_WORKSPACE_NAME_ERROR);
    });

    it('should refuse a workspace name length bellow the allowed range', () => {
      const invalidWorkspaceName = 'a'.repeat(WORKSPACE_NAME_MIN_LENGTH - 1);

      const workspaceName = WorkspaceName.create({ value: invalidWorkspaceName });
      expect(workspaceName.isError).toBeTruthy();
      expect(workspaceName.getError()).toEqual(INVALID_WORKSPACE_NAME_ERROR);
    });

    it('should create a valid workspace name', () => {
      const validWorkspaceName = 'a'.repeat(WORKSPACE_NAME_MAX_LENGTH);

      const workspaceName = WorkspaceName.create({ value: validWorkspaceName });
      expect(workspaceName.isError).toBeFalsy();
      expect(workspaceName.getValue().value).toEqual(validWorkspaceName);
    });
  });
});
