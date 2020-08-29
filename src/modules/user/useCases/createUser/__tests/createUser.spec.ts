import faker from 'faker';

import { CreateUserUseCase } from '../createUser';
import { EMAIL_TAKEN_ERROR } from '../createUserErrors';
import { InMemoryUserRepo } from '../../../infra/repos/tests/inMemoryUserRepo';
import { INVALID_EMAIL_ERROR } from '../../../domain/userEmail';
import { INVALID_PASSWORD_ERROR, PASSWORD_MIN_LENGTH } from '../../../domain/userPassword';

describe('CreateUser', () => {
  const userRepo = new InMemoryUserRepo();
  const createUserUseCase = new CreateUserUseCase(userRepo);
  const createUserDTO = {
    email: faker.internet.email(),
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

  it('should create,persist and return a valid createUserDTOResponse', async () => {
    const createUserDTOResponse = await createUserUseCase.execute(createUserDTO);

    expect(createUserDTOResponse.isError).toBeFalsy();
    const response = createUserDTOResponse.getValue();

    expect(response.email).toEqual(createUserDTO.email);
    expect(response.id).toBeDefined();

    expect(
      userRepo.users.find((storedUser) => storedUser.userId.value.toString() === response.id),
    ).toBeTruthy();
  });

  it('should refuse a duplicated user email', async () => {
    const user = await createUserUseCase.execute({
      ...createUserDTO,
    });

    expect(user.isError).toBeTruthy();
    expect(user.getError()).toEqual(EMAIL_TAKEN_ERROR);
  });
});
