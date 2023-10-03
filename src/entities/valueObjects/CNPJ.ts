export default class CNPJ {
  private cnpj: string;

  private constructor(cnpj: string) {
    this.cnpj = cnpj;
  }

  static fromString(value: string): CNPJ {
    if (!value) {
      throw new Error('CNPJ is required');
    }

    if (!value.match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)) {
      throw new Error('Invalid CNPJ');
    }

    const newCnpj = new CNPJ(value);
    newCnpj.isValid();

    return new CNPJ(value);
  }

  get value(): string {
    return this.cnpj;
  }


  // Verifica se todos os dígitos são iguais (Ex.: 00.000.000/0000-00) 
  private allDigitsAreEqual(cnpj: string): boolean {
    if (/^(\d)\1+$/.test(cnpj)) {
      throw new Error('Invalid CNPJ');
    }
    return true;
  }

  // Calcula o primeiro dígito verificador
  private calculateFirstDigit(cnpj: string): number {
    let sum = 0;
    let weight = 5;

    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }

    let digit = 11 - (sum % 11);

    if (digit > 9) {
      digit = 0;
    }

    return digit;
  }

  // Calcula o segundo dígito verificador
  private calculateSecondDigit(cnpj: string): number {
    let sum = 0;
    let weight = 6;

    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }

    let digit = 11 - (sum % 11);

    if (digit > 9) {
      digit = 0;
    }

    return digit;
  }

  // Valida o CNPJ
  private verifyDigit(cnpjDigit: number, validateDigit: number) {
    if (cnpjDigit !== validateDigit) {
      throw new Error('Invalid CNPJ');
    }
  }

  private isValid(): boolean {
    const cnpj = this.value.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14) return false;

    this.allDigitsAreEqual(cnpj);

    // Calcula o primeiro dígito verificador
    const firstDigit = this.calculateFirstDigit(cnpj);
    this.verifyDigit(firstDigit, parseInt(cnpj.charAt(12)));

    // Calcula o segundo dígito verificador
    const secondDigit = this.calculateSecondDigit(cnpj);
    this.verifyDigit(secondDigit, parseInt(cnpj.charAt(13)));

    return true;
  }
}