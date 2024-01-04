import NotFound from '../../errors/NotFound';
import UserRepository from '../../repositories/user/UserRepository';
import removeFields from '../../utils/excludeObjectField';

export default class FetchUserByIdService {
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async execute(userId: string) {
    const user = await this._userRepository.getById(userId);
    if (!user) {
      throw new NotFound(`User with id ${userId} not found`);
    }
    const userWithoutPassword = removeFields(user, ['password']);
    return userWithoutPassword;
  }
}