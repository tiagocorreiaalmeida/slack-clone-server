import faker from 'faker';

import { User } from '../user';
import { UserPassword, PASSWORD_MIN_LENGTH } from '../userPassword';
import { UserEmail } from '../userEmail';
import { UserName, USER_NAME_MIN_LENGTH } from '../userName';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';

describe('User', () => {
  describe('create', () => {
    const password = UserPassword.create({ value: 'a'.repeat(PASSWORD_MIN_LENGTH) }).getValue();
    const username = UserName.create({ value: 'a'.repeat(USER_NAME_MIN_LENGTH) }).getValue();
    const email = UserEmail.create({ value: faker.internet.email() }).getValue();
    const userData = {
      password,
      username,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should return a user', () => {
      const userId = new UniqueEntityID();
      const user = User.create(userData, userId);

      expect(user.isError).toBeFalsy();
      expect(user.getValue().email).toEqual(userData.email);
      expect(user.getValue().userId.value).toEqual(userId);
    });

    it('should return a new user with id when one is not provided', () => {
      const user = User.create(userData);

      expect(user.isError).toBeFalsy();
      expect(user.getValue().email).toEqual(userData.email);
      expect(user.getValue().userId.value).toBeDefined();
    });
  });
});
