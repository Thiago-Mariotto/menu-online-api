import UserMemoryRepository from '../../../src/repositories/user/UserMemoryRepository';
import FetchUserByIdService from '../../../src/services/user/FetchUserById.service';
import { userFromDatabase } from '../../mocks/user.mock';

describe('# Unit - Services => Fetch All Users', () => {
  let fetchAllUsersService: FetchUserByIdService;
  let userMemoryRepository: UserMemoryRepository;

  beforeEach(() => {
    userMemoryRepository = new UserMemoryRepository();
    fetchAllUsersService = new FetchUserByIdService(userMemoryRepository);
  });

  test('should fetch user success', async () => {
    userMemoryRepository.getById = jest.fn().mockReturnValueOnce(userFromDatabase);
    const user = await fetchAllUsersService.execute(userFromDatabase.userId);
    expect(userMemoryRepository.getById).toHaveBeenCalledTimes(1);
    expect(userMemoryRepository.getById).toHaveBeenCalledWith(userFromDatabase.userId);
  });

  test('should return not found if user not found', async () => {
    userMemoryRepository.getById = jest.fn().mockReturnValueOnce(null);
    const user = await fetchAllUsersService.execute(userFromDatabase.userId);
    expect(userMemoryRepository.getById).toHaveBeenCalledTimes(1);
    expect(userMemoryRepository.getById).toHaveBeenCalledWith(userFromDatabase.userId);
    expect(user).toBeNull();
  });
});