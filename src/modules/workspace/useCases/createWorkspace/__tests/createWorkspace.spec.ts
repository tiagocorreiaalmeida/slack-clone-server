import faker from 'faker';

import { InMemoryMemberRepo } from '../../../infra/repos/tests/inMemoryMemberRepo';
import { InMemoryUserRepo } from '../../../../user/infra/repos/tests/inMemoryUserRepo';
import { InMemoryWorkspaceRepo } from '../../../infra/repos/tests/InMemoryWorkspaceRepo';
import { CreateWorkspaceUseCase } from '../createWorkspace';
import {
  INVALID_WORKSPACE_NAME_ERROR,
  WORKSPACE_NAME_MIN_LENGTH,
} from '../../../domain/workspaceName';
import { USER_NOT_FOUND } from '../createWorkspaceErrors';
import { User } from '../../../../user/domain/user';
import { UserEmail } from '../../../../user/domain/userEmail';
import { UserPassword, PASSWORD_MIN_LENGTH } from '../../../../user/domain/userPassword';

const generateUserCreateProps = () => ({
  email: UserEmail.create({ value: faker.internet.email() }).getValue(),
  password: UserPassword.create({ value: 'a'.repeat(PASSWORD_MIN_LENGTH) }).getValue(),
  isVerified: true,
});

describe('CreateWorkspace', () => {
  const userRepo = new InMemoryUserRepo();
  const memberRepo = new InMemoryMemberRepo();
  const workspaceRepo = new InMemoryWorkspaceRepo();
  const createWorkspaceUseCase = new CreateWorkspaceUseCase(userRepo, workspaceRepo, memberRepo);

  const user = User.create(generateUserCreateProps()).getValue();
  const userId = user.userId.value.toString();

  const workspaceName = 'a'.repeat(WORKSPACE_NAME_MIN_LENGTH);

  beforeAll(async () => {
    await userRepo.save(user);
  });

  it('should refuse an invalid workspace name', async () => {
    const workspaceOrError = await createWorkspaceUseCase.execute({ name: '', ownerId: '' });

    expect(workspaceOrError.isError).toBeTruthy();
    expect(workspaceOrError.getError()).toEqual(INVALID_WORKSPACE_NAME_ERROR);
  });

  it('should refuse a non existent user', async () => {
    const workspaceOrError = await createWorkspaceUseCase.execute({
      name: workspaceName,
      ownerId: '',
    });

    expect(workspaceOrError.isError).toBeTruthy();
    expect(workspaceOrError.getError()).toEqual(USER_NOT_FOUND);
  });

  it('should create a workspace with the owner as admin member and return a valid responseDTO', async () => {
    const workspaceOrError = await createWorkspaceUseCase.execute({
      name: workspaceName,
      ownerId: userId,
    });

    expect(workspaceOrError.isError).toBeFalsy();

    const data = workspaceOrError.getValue();
    expect(data.name).toEqual(workspaceName);
    expect(data.ownerId).toEqual(userId);

    const workspaceAdmin = memberRepo.members[0];
    expect(workspaceAdmin).toBeDefined();
    expect(workspaceAdmin.userId.value.toString()).toEqual(userId);
    expect(workspaceAdmin.isActive).toBeTruthy();
    expect(workspaceAdmin.isAdmin).toBeTruthy();
    expect(workspaceAdmin.isVerified).toBeTruthy();
    expect(workspaceAdmin.workspaceId.value.toString()).toEqual(data.id);
  });
});
