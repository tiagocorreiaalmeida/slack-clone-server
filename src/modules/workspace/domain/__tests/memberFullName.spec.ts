import {
  MemberFullName,
  INVALID_MEMBER_FULL_NAME_ERROR,
  MEMBER_FULL_NAME_MAX_LENGTH,
  MEMBER_FULL_NAME_MIN_LENGTH,
} from '../memberFullName';

describe('MemberFullName', () => {
  describe('create', () => {
    it('should refuse a member full name length above the allowed range', () => {
      const invalidFullName = 'a'.repeat(MEMBER_FULL_NAME_MAX_LENGTH + 1);

      const userFullName = MemberFullName.create({ value: invalidFullName });
      expect(userFullName.isError).toBeTruthy();
      expect(userFullName.getError()).toEqual(INVALID_MEMBER_FULL_NAME_ERROR);
    });

    it('should refuse a member full name length bellow the allowed range', () => {
      const invalidFullName = 'a'.repeat(MEMBER_FULL_NAME_MIN_LENGTH - 1);

      const userFullName = MemberFullName.create({ value: invalidFullName });
      expect(userFullName.isError).toBeTruthy();
      expect(userFullName.getError()).toEqual(INVALID_MEMBER_FULL_NAME_ERROR);
    });

    it('should create a valid full name', () => {
      const validFullName = 'a'.repeat(MEMBER_FULL_NAME_MIN_LENGTH);

      const userFullName = MemberFullName.create({ value: validFullName });
      expect(userFullName.isError).toBeFalsy();
      expect(userFullName.getValue().value).toEqual(validFullName);
    });
  });
});
