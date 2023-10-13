import UserBuilder from "../../src/entities/UserBuilder";

describe('# Unit - Entity => UserBuilder', function () {
  test('should create a valid UserBuilder', function () {

    const user = new UserBuilder('582.304.650-29')
      .setName('John Doe')
      .setEmail('john.doe@mail.com')
      .setPassword('1234Abc#')
      .setPhone('31999999999')
      .build();

    expect(user).toBeDefined();
  });

  test('should throw an error when create a User with invalid CPF', function () {
    expect(() =>
      new UserBuilder('24664052000120')
        .setName('John Doe')
        .setEmail('john.doe@mail.com')
        .setPassword('1234Abc#')
        .setPhone('31999999999')

        .build()
    ).toThrowError('Invalid CPF');
  });

  test('should throw an error when create a User with invalid Email', function () {
    expect(() =>
      new UserBuilder('582.304.650-29')
        .setName('John Doe')
        .setEmail('john.doe@com')
        .setPassword('1234Abc#')
        .setPhone('31999999999')

        .build()
    ).toThrowError('Invalid Email');
  });

  test('should throw an error when create a User with invalid Password without especial character', function () {
    expect(() =>
      new UserBuilder('582.304.650-29')
        .setName('John Doe')
        .setEmail('john.doe@mail.com')
        .setPassword('1234Abc')
        .setPhone('31999999999')

        .build()
    ).toThrowError('Invalid Password');
  });

  test('should throw an error when create a User with invalid Password without number character', function () {
    expect(() =>
      new UserBuilder('582.304.650-29')
        .setName('John Doe')
        .setEmail('john.doe@mail.com')
        .setPassword('Abcdefga#')
        .setPhone('31999999999')

        .build()
    ).toThrowError('Invalid Password');
  });

  test('should throw an error when create a User with invalid Password without upper case character', function () {
    expect(() =>
      new UserBuilder('582.304.650-29')
        .setName('John Doe')
        .setEmail('john.doe@mail.com')
        .setPassword('abcde123#')
        .setPhone('31999999999')

        .build()
    ).toThrowError('Invalid Password');
  });

  test('should throw an error when create a User with invalid Password without lower case character', function () {
    expect(() =>
      new UserBuilder('582.304.650-29')
        .setName('John Doe')
        .setEmail('john.doe@mail.com')
        .setPassword('ABCDEF123#')
        .setPhone('31999999999')

        .build()
    ).toThrowError('Invalid Password');
  });
});