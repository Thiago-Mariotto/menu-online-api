interface IHash {
  generateHash(payload: string): string;
  compareHash(payload: string, hashed: string): boolean;
}

export default IHash;