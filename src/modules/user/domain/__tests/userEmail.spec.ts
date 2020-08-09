import faker from 'faker';

import { UserEmail, INVALID_EMAIL_ERROR } from '../userEmail';

describe('UserEmail', () => {
  describe('create', () => {
    it('should refuse an invalid email', () => {
      const invalidEmail = 'john@@gmail.com';

      const userEmail = UserEmail.create({ value: invalidEmail });
      expect(userEmail.isError).toBeTruthy();
      expect(userEmail.getError()).toEqual(INVALID_EMAIL_ERROR);
    });

    it('should create a valid email', () => {
      const validEmail = faker.internet.email();

      const userEmail = UserEmail.create({ value: validEmail });
      expect(userEmail.isError).toBeFalsy();
      expect(userEmail.getValue().value).toEqual(validEmail);
    });
  });
});
