export default class Password {
  private password: string;

  private static minLength: number = 8;

  constructor(password: string) {
    this.password = password;
  }

  public equals(password: Password): boolean {
    return this.password === password.value;
  }

  public static fromString(password: string) {
    if (!Password.isAValidPassword(password)) throw new Error('Invalid Password');
    return new Password(password);
  }

  public static isAValidPassword(password: string): boolean {
    if (!Password.hasValidLength(password)) return false;
    if (!Password.hasSpecialChars(password)) return false;
    if (!Password.hasUpperCase(password)) return false;
    if (!Password.hasLowerCase(password)) return false;
    if (!Password.hasNumbers(password)) return false;
    return true;
  }

  private static hasValidLength(password: string): boolean {
    return password.length >= Password.minLength;
  }

  private static hasSpecialChars(password: string): boolean {
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\\/?~]/;
    return specialChars.test(password);
  }

  private static hasUpperCase(password: string): boolean {
    const upperCase = /[A-Z]/;
    return upperCase.test(password);
  }

  private static hasLowerCase(password: string): boolean {
    const lowerCase = /[a-z]/;
    return lowerCase.test(password);
  }

  private static hasNumbers(password: string): boolean {
    const numbers = /[0123456789]/;
    return numbers.test(password);
  }

  public get value(): string {
    return this.password;
  }
}