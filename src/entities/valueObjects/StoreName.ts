import BadRequest from '../../errors/BadRequest';

export default class StoreName {
  private name: string;

  private static minLength: number = 3;

  private constructor(name: string) {
    this.name = name;
  }

  public equals(name: StoreName): boolean {
    return this.name === name.value;
  }

  public static fromString(name: string) {
    if (!name) throw new BadRequest('O campo nome é obrigatório');
    if (!name || !StoreName.isAValidName(name)) throw new BadRequest('Nome inválido');
    return new StoreName(name);
  }

  public static isAValidName(name: string): boolean {
    if (!StoreName.hasValidLength(name)) return false;
    return true;
  }

  private static hasValidLength(name: string): boolean {
    return name.length >= StoreName.minLength;
  }

  public get value(): string {
    return this.name;
  }
}