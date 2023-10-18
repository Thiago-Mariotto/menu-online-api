import BadRequest from "../../errors/BadRequest";

export default class Name {
  private name: string;

  private static minLength: number = 3;

  private constructor(name: string) {
    this.name = name;
  }

  public equals(name: Name): boolean {
    return this.name === name.value;
  }

  public static fromString(name: string) {
    if (!Name.isAValidName(name)) throw new BadRequest('Invalid Name');
    return new Name(name);
  }

  public static isAValidName(name: string): boolean {
    if (!Name.hasValidLength(name)) return false;
    if (Name.hasSpecialChars(name)) return false;
    if (Name.hasNumbers(name)) return false;
    return true;
  }

  private static hasValidLength(name: string): boolean {
    return name.length >= Name.minLength;
  }

  private static hasSpecialChars(name: string): boolean {
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\\/?~]/;
    return specialChars.test(name);
  }

  private static hasNumbers(name: string): boolean {
    const numbers = /[0123456789]/;
    return numbers.test(name);
  }

  public get value(): string {
    return this.name;
  }
}