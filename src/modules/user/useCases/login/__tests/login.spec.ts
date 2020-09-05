import faker from 'faker';

import { LoginUseCase } from '../login';
import { InMemoryUserRepo } from '../../../infra/repos/tests/inMemoryUserRepo';
import { authService } from '../../../services';
import { INVALID_EMAIL_ERROR, UserEmail } from '../../../domain/userEmail';
import {
  INVALID_PASSWORD_ERROR,
  UserPassword,
  PASSWORD_MIN_LENGTH,
} from '../../../domain/userPassword';
import { AUTHENTICATION_FAILED, ACCOUNT_NOT_VERIFIED } from '../loginErrors';
import { User } from '../../../domain/user';

const generateUserCreateProps = (isVerified = true) => ({
  email: UserEmail.create({ value: faker.internet.email() }).getValue(),
  password: UserPassword.create({ value: 'a'.repeat(PASSWORD_MIN_LENGTH) }).getValue(),
  isVerified,
});

describe('Login', () => {
  const userRepo = new InMemoryUserRepo();
  const verifiedUser = User.create(generateUserCreateProps()).getValue();
  const nonVerifiedUser = User.create(generateUserCreateProps(false)).getValue();
  const loginUseCase = new LoginUseCase(userRepo, authService);

  beforeAll(async () => {
    await userRepo.save(verifiedUser);
    await userRepo.save(nonVerifiedUser);
  });

  it('should refuse an invalid email', async () => {
    const loginResponse = await loginUseCase.execute({
      email: 'fakeemail',
      password: verifiedUser.password.value,
    });

    expect(loginResponse.isError).toBeTruthy();
    expect(loginResponse.getError()).toEqual(INVALID_EMAIL_ERROR);
  });

  it('should refuse an invalid password', async () => {
    const loginResponse = await loginUseCase.execute({
      email: verifiedUser.email.value,
      password: '',
    });

    expect(loginResponse.isError).toBeTruthy();
    expect(loginResponse.getError()).toEqual(INVALID_PASSWORD_ERROR);
  });

  it('should refuse a non existent user', async () => {
    const loginResponse = await loginUseCase.execute({
      email: faker.internet.email(),
      password: 'a'.repeat(PASSWORD_MIN_LENGTH),
    });

    expect(loginResponse.isError).toBeTruthy();
    expect(loginResponse.getError()).toEqual(AUTHENTICATION_FAILED);
  });

  it('should refuse invalid credentials', async () => {
    const loginResponse = await loginUseCase.execute({
      email: verifiedUser.email.value,
      password: 'b'.repeat(PASSWORD_MIN_LENGTH),
    });

    expect(loginResponse.isError).toBeTruthy();
    expect(loginResponse.getError()).toEqual(AUTHENTICATION_FAILED);
  });

  it('should refuse a not verified user', async () => {
    const loginResponse = await loginUseCase.execute({
      email: nonVerifiedUser.email.value,
      password: nonVerifiedUser.password.value,
    });

    expect(loginResponse.isError).toBeTruthy();
    expect(loginResponse.getError()).toEqual(ACCOUNT_NOT_VERIFIED);
  });

  it('should return a valid loginDTOResponse', async () => {
    const loginResponse = await loginUseCase.execute({
      email: verifiedUser.email.value,
      password: verifiedUser.password.value,
    });

    expect(loginResponse.isError).toBeFalsy();

    const data = loginResponse.getValue();
    const userId = verifiedUser.userId.value.toString();

    expect(data.accessToken).toBeDefined();
    const decodedAccessToken = await authService.decodeAccessToken(data.accessToken);
    expect(decodedAccessToken.userId).toEqual(userId);

    expect(data.refreshToken).toBeDefined();
    const decodedRefreshToken = await authService.decodeRefreshToken(data.refreshToken);
    expect(decodedRefreshToken.userId).toEqual(userId);

    expect(data.user.email).toEqual(verifiedUser.email.value);
    expect(data.user.id).toEqual(userId);
  });
});
