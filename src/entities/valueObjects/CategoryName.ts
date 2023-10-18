import BadRequest from "../../errors/BadRequest";

export default class CategoryName {
  private name: string;

  private static minLength: number = 3;

  private constructor(name: string) {
    this.name = name;
  }

  public equals(name: CategoryName): boolean {
    return this.name === name.value;
  }

  public static fromString(name: string) {
    if (!CategoryName.isAValidName(name)) throw new BadRequest('Invalid Category');
    return new CategoryName(name);
  }

  public static isAValidName(name: string): boolean {
    if (!CategoryName.hasValidLength(name)) return false;
    if (CategoryName.hasSpecialChars(name)) return false;
    if (CategoryName.hasNumbers(name)) return false;
    return true;
  }

  private static hasValidLength(name: string): boolean {
    return name.length >= CategoryName.minLength;
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