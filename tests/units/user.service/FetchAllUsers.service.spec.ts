import UserMemoryRepository from '../../../src/repositories/user/UserMemoryRepository';
import FetchAllUsersService from '../../../src/services/user/FetchAllUsers.service';
import { usersFromDatabase } from '../../mocks/user.mock';

describe('# Unit - Services => Fetch All Users', () => {
  let fetchAllUsersService: FetchAllUsersService;
  let userMemoryRepository: UserMemoryRepository;

  beforeEach(() => {
    userMemoryRepository = new UserMemoryRepository();
    fetchAllUsersService = new FetchAllUsersService(userMemoryRepository);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should fetch all users', async () => {
    userMemoryRepository.getAll = jest.fn().mockReturnValueOnce(usersFromDatabase);
    const users = await fetchAllUsersService.execute();
    expect(users.length).toEqual(2);
    expect(users[0]).toHaveProperty('userId');
    expect(users[0].userId).toEqual('96c1b233-7a87-4c40-979f-cca7acc6d4b8');
  });

  test('should fetch all users when table is empty', async () => {
    userMemoryRepository.getAll = jest.fn().mockReturnValueOnce([]);
    const users = await fetchAllUsersService.execute();
    expect(users.length).toEqual(0);
  });
});