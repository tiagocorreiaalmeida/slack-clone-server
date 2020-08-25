import {
  MemberDisplayName,
  INVALID_MEMBER_DISPLAY_NAME_ERROR,
  MEMBER_DISPLAY_NAME_MAX_LENGTH,
  MEMBER_DISPLAY_NAME_MIN_LENGTH,
} from '../memberDisplayName';

describe('MemberDisplayName', () => {
  describe('create', () => {
    it('should refuse a member display name length above the allowed range', () => {
      const invalidDisplayName = 'a'.repeat(MEMBER_DISPLAY_NAME_MAX_LENGTH + 1);

      const displayName = MemberDisplayName.create({ value: invalidDisplayName });
      expect(displayName.isError).toBeTruthy();
      expect(displayName.getError()).toEqual(INVALID_MEMBER_DISPLAY_NAME_ERROR);
    });

    it('should refuse a member display name length bellow the allowed range', () => {
      const invalidDisplayName = 'a'.repeat(MEMBER_DISPLAY_NAME_MIN_LENGTH - 1);

      const displayName = MemberDisplayName.create({ value: invalidDisplayName });
      expect(displayName.isError).toBeTruthy();
      expect(displayName.getError()).toEqual(INVALID_MEMBER_DISPLAY_NAME_ERROR);
    });

    it('should create a valid member display', () => {
      const validDisplayName = 'a'.repeat(MEMBER_DISPLAY_NAME_MIN_LENGTH);

      const displayName = MemberDisplayName.create({ value: validDisplayName });
      expect(displayName.isError).toBeFalsy();
      expect(displayName.getValue().value).toEqual(validDisplayName);
    });
  });
});
