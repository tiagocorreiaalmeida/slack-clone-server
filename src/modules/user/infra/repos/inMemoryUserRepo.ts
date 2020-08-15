import { UserRepo } from '../../domain/userRepo';
import { UserEmail } from '../../domain/userEmail';
import { UserName } from '../../domain/userName';
import { User } from '../../domain/user';

export class InMemoryUserRepo implements UserRepo {
  users: User[];
  constructor() {
    this.users = [];
  }

  async findByEmailOrUsername(userEmail: UserEmail, username: UserName): Promise<User | null> {
    const user = this.users.find(
      (storedUser) => storedUser.username.equals(username) || storedUser.email.equals(userEmail),
    );

    return user || null;
  }

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}
