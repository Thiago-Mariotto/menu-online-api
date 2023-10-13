import UserMemoryRepository from '../../../src/repositories/user/UserMemoryRepository';
import FetchUserByIdService from '../../../src/services/user/FetchUserById.service';
import { userFromDatabase } from '../../mocks/user.mock';

describe('# Unit - Services => Fetch All Users', () => {
  let fetchUserByIdService: FetchUserByIdService;
  let userMemoryRepository: UserMemoryRepository;

  beforeEach(() => {
    userMemoryRepository = new UserMemoryRepository();
    fetchUserByIdService = new FetchUserByIdService(userMemoryRepository);
  });

  test('should fetch user success', async () => {
    userMemoryRepository.getById = jest.fn().mockReturnValueOnce(userFromDatabase);
    const user = await fetchUserByIdService.execute(userFromDatabase.userId);
    expect(user.userId).toBe(userFromDatabase.userId);
  });

  test('should return not found if user not found', async () => {
    userMemoryRepository.getById = jest.fn().mockReturnValueOnce(null);
    await expect(fetchUserByIdService.execute('96c1b233-7a87-4c40-979f-cca7acc6d4b8'))
      .rejects.toThrow('User with id 96c1b233-7a87-4c40-979f-cca7acc6d4b8 not found');
  });
});