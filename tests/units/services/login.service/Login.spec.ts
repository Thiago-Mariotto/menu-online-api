import IAuth from '../../../../src/repositories/auth/IAuth';
import JWT from '../../../../src/repositories/auth/adapters/JWT';
import IHash from '../../../../src/repositories/hash/IHash';
import Bcrypt from '../../../../src/repositories/hash/adapters/Bcrypt';
import IUserRepository from '../../../../src/repositories/user/UserRepository';
import UserMemoryRepository from '../../../../src/repositories/user/adapters/UserMemoryRepository';
import LoginService from '../../../../src/services/authentication/Login.service';
import { hashedPassword, userFromDatabase, userLogin } from '../../../mocks/user.mock';

describe('# Unit - Services => Login', function () {
  const SECRET_KEY = 'secret';
  let loginService: LoginService;
  let userRepository: IUserRepository;
  let loginRepository: IAuth
  let hashRepository: IHash;

  beforeEach(function () {
    userRepository = new UserMemoryRepository();
    hashRepository = new Bcrypt();
    loginRepository = new JWT(SECRET_KEY);
    loginService = new LoginService(userRepository, loginRepository, hashRepository);
  });


  test('should make a valid login', async function () {
    userRepository.getByEmail = jest.fn().mockResolvedValue({ ...userFromDatabase, password: hashedPassword });
    const response = await loginService.execute(userLogin);
    expect(response).toHaveProperty('token');
  });

  test('should throw an error when user does not exists', async function () {
    userRepository.getByEmail = jest.fn().mockResolvedValue(null);
    await expect(loginService.execute(userLogin)).rejects.toThrowError('Email or password invalid');
  });

  test('should throw an error when password is invalid', async function () {
    userRepository.getByEmail = jest.fn().mockResolvedValue({ ...userFromDatabase, password: hashedPassword });
    const invalidPassword = '12345Abcd##';
    await expect(loginService.execute({ ...userLogin, password: invalidPassword }))
      .rejects.toThrowError('Email or password invalid');
  });

  test('should throw an error when user is inactive', async function () {
    userRepository.getByEmail = jest.fn().mockResolvedValue({ ...userFromDatabase, password: hashedPassword, active: false });
    await expect(loginService.execute(userLogin)).rejects.toThrowError('User inactive');
  });
});