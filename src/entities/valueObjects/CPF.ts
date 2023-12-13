import BadRequest from '../../errors/BadRequest';

export default class CPF {
  private cpf: string;

  private constructor(cpf: string) {
    this.cpf = cpf;
  }

  static fromString(value: string): CPF {
    if (!CPF.validCpf(value)) throw new BadRequest('Invalid CPF');
    return new CPF(CPF.formatCPF(value));
  }

  get value(): string {
    return this.cpf;
  }

  private static validCpf(cpf: string) {
    if (!cpf) throw new BadRequest('CPF is required');
    cpf = CPF.cleanCpf(cpf);
    if (!CPF.isValidLength(cpf)) return false;
    if (CPF.hasAllDigitsEqual(cpf)) return false;
    const digit1 = CPF.calculateDigit(cpf, 10);
    const digit2 = CPF.calculateDigit(cpf, 11);
    const checkDigit = CPF.extractDigit(cpf);
    const calculatedDigit = `${digit1}${digit2}`;
    return checkDigit == calculatedDigit;
  }

  private static formatCPF(value: string) {
    const strCPF = CPF.cleanCpf(value);
    return strCPF.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4',
    );
  }

  private static cleanCpf(cpf: string) {
    return cpf.replace(/[^\d]+/g, '');
  }

  private static isValidLength(cpf: string) {
    return cpf.length === 11 || cpf.length === 14;
  }

  private static hasAllDigitsEqual(cpf: string) {
    const firstDigit = cpf[0];
    return cpf.split('').every(digit => digit === firstDigit);
  }

  private static extractDigit(cpf: string) {
    return cpf.slice(9);
  }

  private static calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return (rest < 2) ? 0 : 11 - rest;
  }
}