import faker from 'faker';

import { CreateUserUseCase } from '../createUser';
import { EMAIL_TAKEN_ERROR, USERNAME_TAKEN_ERROR } from '../createUserErrors';
import { InMemoryUserRepo } from '../../../infra/repos/inMemoryUserRepo';
import { INVALID_EMAIL_ERROR } from '../../../domain/userEmail';
import { INVALID_USER_NAME_ERROR, USER_NAME_MIN_LENGTH } from '../../../domain/userName';
import { INVALID_PASSWORD_ERROR, PASSWORD_MIN_LENGTH } from '../../../domain/userPassword';

describe('CreateUser', () => {
  const userRepo = new InMemoryUserRepo();
  const createUserUseCase = new CreateUserUseCase(userRepo);
  const createUserDTO = {
    email: faker.internet.email(),
    username: 'a'.repeat(USER_NAME_MIN_LENGTH),
    password: 'a'.repeat(PASSWORD_MIN_LENGTH),
  };

  it('should refuse an invalid email', async () => {
    const user = await createUserUseCase.execute({
      ...createUserDTO,
      email: 'fakeemail',
    });

    expect(user.isError).toBeTruthy();
    expect(user.getError()).toEqual(INVALID_EMAIL_ERROR);
  });

  it('should refuse an invalid password', async () => {
    const user = await createUserUseCase.execute({
      ...createUserDTO,
      password: 'a'.repeat(PASSWORD_MIN_LENGTH - 1),
    });

    expect(user.isError).toBeTruthy();
    expect(user.getError()).toEqual(INVALID_PASSWORD_ERROR);
  });

  it('should refuse an invalid username', async () => {
    const user = await createUserUseCase.execute({
      ...createUserDTO,
      username: 'a'.repeat(USER_NAME_MIN_LENGTH - 1),
    });

    expect(user.isError).toBeTruthy();
    expect(user.getError()).toEqual(INVALID_USER_NAME_ERROR);
  });

  it('should create,persist and return a valid domain user', async () => {
    const domainUser = await createUserUseCase.execute(createUserDTO);

    expect(domainUser.isError).toBeFalsy();
    const user = domainUser.getValue();

    expect(user.email.value).toEqual(createUserDTO.email);
    expect(user.username.value).toEqual(createUserDTO.username);
    expect(user.password.isAlreadyHashed).toBeTruthy();

    expect(userRepo.users).toContain(domainUser.getValue());
  });

  it('should refuse a duplicated user email', async () => {
    const user = await createUserUseCase.execute({
      ...createUserDTO,
      username: 'a'.repeat(PASSWORD_MIN_LENGTH),
    });

    expect(user.isError).toBeTruthy();
    expect(user.getError()).toEqual(EMAIL_TAKEN_ERROR);
  });

  it('should refuse a duplicated username', async () => {
    const user = await createUserUseCase.execute({
      ...createUserDTO,
      email: faker.internet.email(),
    });

    expect(user.isError).toBeTruthy();
    expect(user.getError()).toEqual(USERNAME_TAKEN_ERROR);
  });
});
