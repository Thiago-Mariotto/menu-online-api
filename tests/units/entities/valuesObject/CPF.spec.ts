import CPF from '../../../../src/entities/valueObjects/CPF';

describe('# Unit - ValueObjects => CPF', function () {
  test('should create a valid CPF', function () {
    const cpf = CPF.fromString('439.333.610-01');
    expect(cpf.value).toBe('439.333.610-01');
  });

  test('should throw an error when CPF is empty', function () {
    expect(() => CPF.fromString('')).toThrow('Invalid CPF');
  });

  test('should throw an error when CPF is invalid', function () {
    expect(() => CPF.fromString('439.333.610-02')).toThrow('Invalid CPF');
  });

  test('should throw an error when CPF has all digits equal', function () {
    expect(() => CPF.fromString('000.000.000-00')).toThrow('Invalid CPF');
    expect(() => CPF.fromString('111.111.111-11')).toThrow('Invalid CPF');
    expect(() => CPF.fromString('777.777.777-77')).toThrow('Invalid CPF');
  });

  test('should throw an error when CPF has invalid first verification digit', function () {
    expect(() => CPF.fromString('439.333.610-02')).toThrow('Invalid CPF');
  });

  test('should throw an error when CPF has invalid second verification digit', function () {
    expect(() => CPF.fromString('439.333.610-11')).toThrow('Invalid CPF');
  });
});