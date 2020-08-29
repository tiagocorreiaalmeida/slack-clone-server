import { CreateUserUseCase } from './createUser';
import { userRepo } from '../../infra/repos';

export const createUserUseCase = new CreateUserUseCase(userRepo);
