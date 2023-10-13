import Password from '../../../../src/entities/valueObjects/Password';

describe('# Unit - ValueObjects => Password', function () {
  test('should create a valid Password', function () {
    const password = Password.fromString('Password123#');
    expect(password.value).toBe('Password123#');
  });

  test('should throw an error when create a invalid Password length < 8', function () {
    expect(() => Password.fromString('123456')).toThrowError('Invalid Password');
  });

  test('should throw an error when create a invalid Password without special chars', function () {
    expect(() => Password.fromString('Password123')).toThrowError('Invalid Password');
  });

  test('should throw an error when create a invalid Password without upper case', function () {
    expect(() => Password.fromString('password123#')).toThrowError('Invalid Password');
  });

  test('should throw an error when create a invalid Password without lower case', function () {
    expect(() => Password.fromString('PASSWORD123#')).toThrowError('Invalid Password');
  });

  test('should throw an error when create a invalid Password without numbers', function () {
    expect(() => Password.fromString('Password#')).toThrowError('Invalid Password');
  });
});