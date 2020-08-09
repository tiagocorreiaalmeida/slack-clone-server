import {
  UserName,
  INVALID_USER_NAME,
  USER_NAME_MIN_LENGTH,
  USER_NAME_MAX_LENGTH,
} from '../userName';

describe('userName', () => {
  describe('create', () => {
    it('should refuse a username lenght above the allowed range', () => {
      const invalidUserName = 'a'.repeat(USER_NAME_MAX_LENGTH + 1);

      const userName = UserName.create({ value: invalidUserName });
      expect(userName.isError).toBeTruthy();
      expect(userName.getError()).toEqual(INVALID_USER_NAME);
    });

    it('should refuse a username length bellow the allowed range', () => {
      const invalidUserName = 'a'.repeat(USER_NAME_MIN_LENGTH - 1);

      const userName = UserName.create({ value: invalidUserName });
      expect(userName.isError).toBeTruthy();
      expect(userName.getError()).toEqual(INVALID_USER_NAME);
    });

    it('should create a valid username', () => {
      const validUserName = 'a'.repeat(USER_NAME_MAX_LENGTH);

      const userName = UserName.create({ value: validUserName });
      expect(userName.isError).toBeFalsy();
      expect(userName.getValue().value).toEqual(validUserName);
    });
  });
});
