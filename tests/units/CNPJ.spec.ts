import CNPJ from '../../src/entities/valueObjects/CNPJ';

describe('# Unit - ValueObjects => CNPJ', function () {
  test('should create a valid CNPJ', function () {
    const cnpj = CNPJ.fromString('02.932.206/0001-85');
    expect(cnpj.value).toBe('02.932.206/0001-85');
  });

  test('should throw an error when CNPJ is empty', function () {
    expect(() => CNPJ.fromString('')).toThrow('CNPJ is required');
  });

  test('should throw an error when CNPJ is invalid', function () {
    expect(() => CNPJ.fromString('02.932.206/0001-86')).toThrow('Invalid CNPJ');
  });

  test('should throw an error when CNPJ has all digits equal', function () {
    expect(() => CNPJ.fromString('00.000.000/0000-00')).toThrow('Invalid CNPJ');
  });

  test('should throw an error when CNPJ has invalid first verification digit', function () {
    expect(() => CNPJ.fromString('02.932.206/0001-84')).toThrow('Invalid CNPJ');
  });

  test('should throw an error when CNPJ has invalid second verification digit', function () {
    expect(() => CNPJ.fromString('02.932.206/0001-86')).toThrow('Invalid CNPJ');
  });

  test('should throw an error when CNPJ has invalid format', function () {
    expect(() => CNPJ.fromString('02932206000185')).toThrow('Invalid CNPJ');
  });
});