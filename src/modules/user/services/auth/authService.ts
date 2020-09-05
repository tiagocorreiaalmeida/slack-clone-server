import { JWTClaims, JWTToken, JWTRefreshToken } from '../../domain/jwt';

export interface AuthService {
  createAccessToken(props: JWTClaims): JWTToken;
  decodeAccessToken(token: string): Promise<JWTClaims>;
  createRefreshToken(props: JWTClaims): JWTRefreshToken;
  decodeRefreshToken(token: string): Promise<JWTClaims>;
}
