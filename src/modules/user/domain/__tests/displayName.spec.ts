import {
  UserDisplayName,
  INVALID_DISPLAY_NAME,
  DISPLAY_NAME_MIN_LENGTH,
  DISPLAY_NAME_MAX_LENGTH,
} from '../userDisplayName';

describe('displayName', () => {
  describe('create', () => {
    it("should refuse a user's display name lenght above the allowed range", () => {
      const invalidUserDisplayName = 'a'.repeat(DISPLAY_NAME_MAX_LENGTH + 1);

      const userDisplayName = UserDisplayName.create({ value: invalidUserDisplayName });
      expect(userDisplayName.isError).toBeTruthy();
      expect(userDisplayName.getError()).toEqual(INVALID_DISPLAY_NAME);
    });

    it("should refuse a user's display name length bellow the allowed range", () => {
      const invalidUserDisplayName = 'a'.repeat(DISPLAY_NAME_MIN_LENGTH - 1);

      const userDisplayName = UserDisplayName.create({ value: invalidUserDisplayName });
      expect(userDisplayName.isError).toBeTruthy();
      expect(userDisplayName.getError()).toEqual(INVALID_DISPLAY_NAME);
    });

    it('should create a valid displayName', () => {
      const validUserDisplayName = 'a'.repeat(DISPLAY_NAME_MAX_LENGTH);

      const userDisplayName = UserDisplayName.create({ value: validUserDisplayName });
      expect(userDisplayName.isError).toBeFalsy();
      expect(userDisplayName.getValue().value).toEqual(validUserDisplayName);
    });
  });
});
