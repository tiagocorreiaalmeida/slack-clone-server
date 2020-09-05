import faker from 'faker';

import { RefreshAccessTokenUseCase } from '../refreshAccessToken';
import { InMemoryUserRepo } from '../../../infra/repos/tests/inMemoryUserRepo';
import { authService } from '../../../services';
import { REFRESH_TOKEN_FAILED } from '../refreshAccessTokenErrors';
import { UserPassword, PASSWORD_MIN_LENGTH } from '../../../domain/userPassword';
import { UserEmail } from '../../../domain/userEmail';
import { User } from '../../../domain/user';

const generateUserCreateProps = () => ({
  email: UserEmail.create({ value: faker.internet.email() }).getValue(),
  password: UserPassword.create({ value: 'a'.repeat(PASSWORD_MIN_LENGTH) }).getValue(),
  isVerified: true,
});

describe('RefreshAccessToken', () => {
  const userRepo = new InMemoryUserRepo();

  const refreshAccessTokenUseCase = new RefreshAccessTokenUseCase(userRepo, authService);

  const deletedUser = User.create(generateUserCreateProps()).getValue();
  const user = User.create(generateUserCreateProps()).getValue();

  const deletedUserRefreshToken = authService.createRefreshToken({
    userId: deletedUser.userId.value.toString(),
  });
  const userRefreshToken = authService.createRefreshToken({
    userId: user.userId.value.toString(),
  });

  beforeAll(async () => {
    await userRepo.save(deletedUser);
    await userRepo.save(user);

    await userRepo.delete(deletedUser.userId.value.toString());
  });

  it('should refuse an invalid refresh token', async () => {
    const refreshAccessTokenResponse = await refreshAccessTokenUseCase.execute({
      refreshToken: '12345',
    });

    expect(refreshAccessTokenResponse.isError).toBeTruthy();
    expect(refreshAccessTokenResponse.getError()).toEqual(REFRESH_TOKEN_FAILED);
  });

  it('should refuse a non existent user', async () => {
    const refreshAccessTokenResponse = await refreshAccessTokenUseCase.execute({
      refreshToken: deletedUserRefreshToken,
    });

    expect(refreshAccessTokenResponse.isError).toBeTruthy();
    expect(refreshAccessTokenResponse.getError()).toEqual(REFRESH_TOKEN_FAILED);
  });

  it('should return a valid RefreshAccessTokenDTOResponse', async () => {
    const refreshAccessTokenResponse = await refreshAccessTokenUseCase.execute({
      refreshToken: userRefreshToken,
    });

    expect(refreshAccessTokenResponse.isError).toBeFalsy();

    const data = refreshAccessTokenResponse.getValue();
    const userId = user.userId.value.toString();

    expect(data.accessToken).toBeDefined();
    const decodedAccessToken = await authService.decodeAccessToken(data.accessToken);
    expect(decodedAccessToken.userId).toEqual(userId);

    expect(data.refreshToken).toBeDefined();
    const decodedRefreshToken = await authService.decodeRefreshToken(data.refreshToken);
    expect(decodedRefreshToken.userId).toEqual(userId);
  });
});
