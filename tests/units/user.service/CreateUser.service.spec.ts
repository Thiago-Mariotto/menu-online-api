import UserMemoryRepository from '../../../src/repositories/user/UserMemoryRepository';
import RegisterUserService from '../../../src/services/user/RegisterUser.service';
import { userFromDatabase, validUser } from '../../mocks/user.mock';

describe('# Unit - Services => Create User', () => {
  let registerUserService: RegisterUserService;
  let userMemoryRepository: UserMemoryRepository;

  beforeEach(() => {
    userMemoryRepository = new UserMemoryRepository();
    registerUserService = new RegisterUserService(userMemoryRepository);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create a valid user', async () => {
    userMemoryRepository.getByEmail = jest.fn().mockReturnValueOnce(null);
    userMemoryRepository.getByCPF = jest.fn().mockReturnValueOnce(null);
    userMemoryRepository.save = jest.fn().mockReturnValueOnce(userFromDatabase);

    const user = await registerUserService.execute(validUser);
    expect(user).toHaveProperty('userId');
    expect(user.userId.length).toBe(36);
  });

  test('should not create a user with an existing CPF', async () => {
    userMemoryRepository.getByCPF = jest.fn().mockReturnValueOnce(userFromDatabase);
    userMemoryRepository.getByEmail = jest.fn().mockReturnValueOnce(undefined);

    await expect(registerUserService.execute(validUser))
      .rejects.toThrow('CPF already registered');
  });

  test('should not create a user with an existing email', async () => {
    userMemoryRepository.getByCPF = jest.fn().mockReturnValueOnce(null);
    userMemoryRepository.getByEmail = jest.fn().mockReturnValueOnce(userFromDatabase);

    await expect(registerUserService.execute(validUser))
      .rejects.toThrow('CPF already registered');
  });

  test('should not create a user with an invalid CPF', async () => {
    const invalidUser = { ...validUser, cpf: '123.456.789-00' };

    await expect(registerUserService.execute(invalidUser))
      .rejects.toThrow('Invalid CPF');
  });

  test('should not create a user with an invalid email', async () => {
    const invalidUser = { ...validUser, email: 'invalid-email' };

    await expect(registerUserService.execute(invalidUser))
      .rejects.toThrow('Invalid Email');
  });

  test('should not create a user with an invalid password', async () => {
    const invalidUser = { ...validUser, password: '12345' };

    await expect(registerUserService.execute(invalidUser))
      .rejects.toThrow('Invalid Password');
  });

  test('should not create a user with an invalid name', async () => {
    const invalidUser = { ...validUser, name: 'Jo' };

    await expect(registerUserService.execute(invalidUser))
      .rejects.toThrow('Invalid Name');
  });
});