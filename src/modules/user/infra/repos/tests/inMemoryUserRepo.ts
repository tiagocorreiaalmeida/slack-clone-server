import { UserRepo as IUserRepo } from '../../../domain/repos/userRepo';
import { UserEmail } from '../../../domain/userEmail';
import { User } from '../../../domain/user';

export class InMemoryUserRepo implements IUserRepo {
  users: User[];
  constructor() {
    this.users = [];
  }

  async findByEmail(userEmail: UserEmail): Promise<User | null> {
    const user = this.users.find((storedUser) => storedUser.email.equals(userEmail));

    return user || null;
  }

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.users.find((storedUser) => storedUser.userId.value.toString() === userId);

    return user || null;
  }

  async delete(userId: string): Promise<void> {
    this.users = this.users.filter((user) => user.userId.value.toString() !== userId);
  }
}

export const UserRepo = new InMemoryUserRepo();
