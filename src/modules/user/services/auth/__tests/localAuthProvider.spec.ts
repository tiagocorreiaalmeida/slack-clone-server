import { LocalAuthProvider } from '../localAuthProvider';
import { UserId } from '../../../domain/userId';
import { JWTToken, JWTRefreshToken } from '../../../domain/jwt';

describe('LocalAuthProvider', () => {
  const authService = new LocalAuthProvider();
  const userId = UserId.create().getValue().value.toString();

  describe('accessToken', () => {
    let accessToken: JWTToken;
    it('should create a valid access token', () => {
      accessToken = authService.createAccessToken({
        userId,
      });

      expect(accessToken).toBeDefined();
    });

    it('should decode a valid refresh token', async () => {
      const decodedToken = await authService.decodeAccessToken(accessToken);

      expect(decodedToken).toBeDefined();
      expect(decodedToken.userId).toEqual(userId);
    });
  });

  describe('refreshToken', () => {
    let refreshToken: JWTRefreshToken;
    it('should create a valid refresh token', () => {
      refreshToken = authService.createRefreshToken({
        userId,
      });

      expect(refreshToken).toBeDefined();
    });

    it('should decode a valid access token', async () => {
      const decodedToken = await authService.decodeRefreshToken(refreshToken);

      expect(decodedToken).toBeDefined();
      expect(decodedToken.userId).toEqual(userId);
    });
  });
});
