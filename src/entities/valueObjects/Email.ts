export default class Email {
  private email: string;

  private constructor(email: string) {
    this.email = email;
  }

  public equals(email: Email): boolean {
    return this.email === email.value;
  }

  public static fromString(email: string) {
    if (!Email.isAValidEmail(email)) throw new Error('Invalid Email');
    return new Email(email);
  }

  public static isAValidEmail(email: string): boolean {
    if (!Email.hasValidLength(email)) return false;
    if (!Email.hasAtSymbol(email)) return false;
    if (!Email.hasDotCom(email)) return false;
    return true;
  }

  private static hasValidLength(email: string): boolean {
    return email.length >= 5;
  }

  private static hasAtSymbol(email: string): boolean {
    const atSymbol = /[@]/;
    return atSymbol.test(email);
  }

  private static hasDotCom(email: string): boolean {
    const dotCom = /[.][c][o][m]/;
    return dotCom.test(email);
  }

  public get value(): string {
    return this.email;
  }
}