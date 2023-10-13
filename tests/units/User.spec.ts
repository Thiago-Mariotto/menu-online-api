import User from "../../src/entities/User";
import UserBuilder from "../../src/entities/UserBuilder";

describe('# Unit - Entity => User', () => {
  const userBuild = new UserBuilder('582.304.650-29')
    .setEmail('john@mail.com')
    .setName('John Doe')
    .setPassword('1234Abc#')
    .setPhone('31999999999');

  const user = new User(userBuild);

  test('should create a valid User', () => {
    expect(user).toBeDefined();
  });

  test('should return a valid User id', () => {
    user.id = '1';
    expect(user.id).toBeDefined();
  });

  test('should return a valid User name', () => {
    expect(user.name).toBeDefined();
  });

  test('should return a valid User email', () => {
    expect(user.email).toBeDefined();
  });

  test('should return a valid User password', () => {
    expect(user.password).toBeDefined();
  });

  test('should return a last login', () => {
    expect(user.lastLogin).toBeDefined();
  }
  );

  test('should return status of user', () => {
    expect(user.active).toBeDefined();
  });

  test('should return a valid User role', () => {
    expect(user.role).toBeDefined();
  });

  test('should return a valid User phone', () => {
    expect(user.phone).toBeDefined();
  });

  test('should return a valid User cpf', () => {
    expect(user.cpf).toBeDefined();
  });

  test('should return a valid User createdAt', () => {
    expect(user.createdAt).toBeDefined();
  });

  test('should be possible set user id', () => {
    const id = '1';
    user.id = id;
    expect(user.id).toBe(id);
  });

  test('should be possible to set user phone', () => {
    const phone = '31999999999';
    user.phone = phone;
    expect(user.phone).toBe(phone);
  });

  test('should be possible set user to inactive', () => {
    user.active = false;
    expect(user.active).toBe(false);
  });

  test('should be possible to set last login', () => {
    const lastLoginDate = new Date();
    user.lastLogin = lastLoginDate;
    expect(user.lastLogin).toBe(lastLoginDate);
  });

  test('should be possible to set user name', () => {
    const name = 'John Doe W';
    user.name = name;
    expect(user.name.value).toBe(name);
  });

  test('should be possible to set user email', () => {
    const email = 'johnw@Mmail.com';
    user.email = email;
    expect(user.email.value).toBe(email);
  });

  test('should be possible to set user password', () => {
    const password = '1234Abc#2';
    user.password = password;
    expect(user.password.value).toBe(password);
  });

  test('should be possible to set user role', () => {
    const role = 'admin';
    user.role = role;
    expect(user.role).toBe(role);
  });
});