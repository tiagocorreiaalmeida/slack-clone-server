import faker from 'faker';

import {
  UserPassword,
  INVALID_PASSWORD_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from '../userPassword';

describe('UserPassword', () => {
  describe('create', () => {
    it(`should refuse a password length below the required range`, () => {
      const invalidPassword = faker.internet.password(PASSWORD_MIN_LENGTH - 1);

      const userPassword = UserPassword.create({ value: invalidPassword });
      expect(userPassword.isError).toBeTruthy();
      expect(userPassword.getError()).toEqual(INVALID_PASSWORD_ERROR);
    });
    it(`should refuse a password length above the required range`, () => {
      const invalidPassword = faker.internet.password(PASSWORD_MAX_LENGTH + 1);

      const userPassword = UserPassword.create({ value: invalidPassword });
      expect(userPassword.isError).toBeTruthy();
      expect(userPassword.getError()).toEqual(INVALID_PASSWORD_ERROR);
    });
    it('should create a valid password', () => {
      const validPassword = faker.internet.password(PASSWORD_MIN_LENGTH);

      const userPassword = UserPassword.create({ value: validPassword });
      expect(userPassword.isError).toBeFalsy();
      expect(userPassword.getValue().value).toEqual(validPassword);
    });
  });

  describe('getHashedValue', () => {
    it('should return a hashed version of the password', () => {
      const password = faker.internet.password(PASSWORD_MIN_LENGTH);

      const userPassword = UserPassword.create({ value: password });
      expect(userPassword.getValue().getHashedValue() === password).toBeFalsy();
    });

    it('should return the same password if already hashed', () => {
      const password = faker.internet.password(PASSWORD_MIN_LENGTH);

      const userPassword = UserPassword.create({ value: password, hashed: true });
      expect(userPassword.getValue().getHashedValue() === password).toBeTruthy();
    });
  });

  describe('comparePassword', () => {
    it('hashed: should match if the plain text password is equal', () => {
      const password = faker.internet.password(PASSWORD_MAX_LENGTH);

      const userPassword = UserPassword.create({
        value: password,
      });

      const hasUserPassword = UserPassword.create({
        value: userPassword.getValue().getHashedValue(),
        hashed: true,
      });

      expect(hasUserPassword.getValue().comparePassword(password)).toBeTruthy();
    });

    it('hashed: should not match if the plain text password is not equal', () => {
      const passwordOne = faker.internet.password(PASSWORD_MAX_LENGTH);
      const passwordTwo = faker.internet.password(PASSWORD_MIN_LENGTH);

      const userPassword = UserPassword.create({
        value: passwordOne,
      });

      const hasUserPassword = UserPassword.create({
        value: userPassword.getValue().getHashedValue(),
        hashed: true,
      });

      expect(hasUserPassword.getValue().comparePassword(passwordTwo)).toBeFalsy();
    });

    it('should match two equal plain text passwords', () => {
      const password = faker.internet.password(PASSWORD_MIN_LENGTH);

      const userPassword = UserPassword.create({
        value: password,
      });

      expect(userPassword.getValue().comparePassword(password)).toBeTruthy();
    });

    it('should not match two different plain text passwords', () => {
      const passwordOne = faker.internet.password(PASSWORD_MIN_LENGTH);
      const passwordTwo = faker.internet.password(PASSWORD_MAX_LENGTH);

      const userPassword = UserPassword.create({
        value: passwordOne,
      });

      expect(userPassword.getValue().comparePassword(passwordTwo)).toBeFalsy();
    });
  });
});
