import { UserRepo as IUserRepo } from '../../domain/repos/userRepo';
import { UserEmail } from '../../domain/userEmail';
import { User } from '../../domain/user';
import { User as UserModel } from '../../../../shared/infra/database/sequelize/models/User';
import { UserMap } from '../../mappers/userMap';

export class SequelizeUserRepo implements IUserRepo {
  constructor(private userModel: typeof UserModel) {}

  async findByEmail(userEmail: UserEmail): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: { email: userEmail.value },
    });

    return user ? UserMap.toDomain(user) : null;
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.userModel.findByPk(userId);

    return user ? UserMap.toDomain(user) : null;
  }

  async save(user: User): Promise<User> {
    const sequelizeUser = UserMap.toPersistance(user);

    const storedUser = await this.userModel.create(sequelizeUser);

    return UserMap.toDomain(storedUser);
  }
}

export const UserRepo = new SequelizeUserRepo(UserModel);
