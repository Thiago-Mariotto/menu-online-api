import bcrypt from 'bcryptjs';
import IHash from '../IHash';

export default class Bcrypt implements IHash {
  public generateHash(string: string): string {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(string, salt);
    return hash;
  }

  public compareHash(string: string, hash: string): boolean {
    const isHashValid = bcrypt.compareSync(string, hash);
    return isHashValid;
  }
}