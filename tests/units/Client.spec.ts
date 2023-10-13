import Client from '../../src/entities/Client';
import { validClient } from '../mocks/client.mock';

describe('# Unit - Entities => Client', () => {
  test('should create a valid Client', () => {
    const newClient = new Client('John Doe', '99999999999', 'joh@mail.com');
    expect(newClient.name.value).toBe('John Doe');
  });

  test('should throw an error when create a invalid Client with name length < 3', () => {
    expect(() => new Client('ze', validClient.phone, validClient.email)).toThrowError('Invalid Name');
  });

  test('should throw an error when create a invalid Client with name contains number', () => {
    expect(() => new Client('Thiago 123', validClient.phone, validClient.email)).toThrowError('Invalid Name');
  });

  test('should throw an error when create a invalid Client with name contains special characters', () => {
    expect(() => new Client('Thiago!.', validClient.phone, validClient.email)).toThrowError('Invalid Name');
  });

  test('should throw an error when create a invalid Client with name length > 50', () => {
    expect(() => new Client(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae.',
      validClient.phone,
      validClient.email))
      .toThrowError('Invalid Name');
  });

  test('should throw an error when create a invalid Client with invalid Email', () => {
    expect(() => new Client(validClient.name, validClient.phone, 'invalidEmail'))
      .toThrowError('Invalid Email');
  });

  test('should be possible to change the Client name', () => {
    const newClient = new Client(validClient.name, validClient.phone, validClient.email);
    newClient.name = 'New Name';
    expect(newClient.name.value).toBe('New Name');
  });

  test('should be possible to change the Client phone', () => {
    const newClient = new Client(validClient.name, validClient.phone, validClient.email);
    newClient.phone = '123456789';
    expect(newClient.phone).toBe('123456789');
  });

  test('should be possible to change the Client email', () => {
    const newClient = new Client(validClient.name, validClient.phone, validClient.email);
    newClient.email = 'johmail@mail.com';
    expect(newClient.email.value).toBe('johmail@mail.com');
  });

  test('should be possible to set the Client id', () => {
    const newClient = new Client(validClient.name, validClient.phone, validClient.email);
    newClient.id = '123';
    expect(newClient.id).toBe('123');
  });

  test('should not be possible to change the Client id', () => {
    const newClient = new Client(validClient.name, validClient.phone, validClient.email);
    newClient.id = '123';
    newClient.id = '456';
    expect(newClient.id).toBe('123');
  });
});