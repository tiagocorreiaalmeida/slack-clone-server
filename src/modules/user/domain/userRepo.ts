import { UserEmail } from './userEmail';
import { UserName } from './userName';
import { User } from './user';

export interface UserRepo {
  save(user: User): Promise<User>;
  findByEmailOrUsername(userEmail: UserEmail, username: UserName): Promise<User | null>;
}
