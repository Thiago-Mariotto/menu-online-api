import User from '../../entities/User';
import { TInputAddress } from '../../types/Address';

export default class AddressPrismaMapper {
  
  public static mapAddressFromUser(user: User): Omit<TInputAddress, 'districtId'> {
    if (!user.id) throw new Error('user id not found');
    const { address } = user;
    return Object.assign(address, { userId: user.id});
  }
}