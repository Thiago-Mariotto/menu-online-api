import UserRepository from '../../repositories/user/UserRepository';
import removeFields from '../../utils/excludeObjectField';

export default class FetchAllUsersService {
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async execute() {
    const users = await this._userRepository.getAll();
    const usersWithoutPassword = users.map(user => {
      return removeFields(user, ['password']);
    });

    return usersWithoutPassword;
  }
}