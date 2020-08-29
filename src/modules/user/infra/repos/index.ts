import { SequelizeUserRepo } from './sequelizeUserRepo';
import { User } from '../../../../shared/infra/database/sequelize/models/User';

const userRepo = new SequelizeUserRepo(User);

export { userRepo };
