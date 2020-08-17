import { UserId } from '../userId';

describe('UserId', () => {
  describe('create', () => {
    it('should create a valid userId', () => {
      const userId = UserId.create();
      expect(userId.isError).toBeFalsy();
      expect(userId.getValue()).toBeDefined();
    });
  });
});
