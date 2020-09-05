import { UserEmail } from '../userEmail';
import { User } from '../user';

export interface UserRepo {
  save(user: User): Promise<User>;
  findByEmail(userEmail: UserEmail): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
  delete(userId: string): Promise<void>;
}
