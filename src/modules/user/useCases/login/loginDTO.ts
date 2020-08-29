import { UserDTO } from '../../dtos/userDTO';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginDTOResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDTO;
}
