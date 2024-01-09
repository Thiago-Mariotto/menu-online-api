import Email from '../../../../src/entities/valueObjects/Email';

describe('# Unit - ValueObjects => Email', function () {
  test('should create a valid Email', function () {
    const email = Email.fromString('john@mail.com');
    expect(email.value).toBe('john@mail.com');
  });

  test('should throw an error when create a invalid Email no using ".com"', function () {
    expect(() => Email.fromString('')).toThrowError('Email is required');
  });

  test('should throw an error when create a invalid Email no using "@" symbol', function () {
    expect(() => Email.fromString('ze.com')).toThrowError('Invalid Email');
  });

  test('should throw an error when create a invalid Email with length < 5', function () {
    expect(() => Email.fromString('z@.c')).toThrowError('Invalid Email');
  });
});