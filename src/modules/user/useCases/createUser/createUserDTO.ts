import { UserDTO } from '../../dtos/userDTO';

export interface CreateUserDTO {
  email: string;
  password: string;
}

export type CreateUserDTOResponse = UserDTO;
