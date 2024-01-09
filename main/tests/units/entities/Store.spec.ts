import Store from '../../../src/entities/Store';
import StoreBuilder from '../../../src/entities/StoreBuilder';

describe('# Unit - Entity => Store', () => {
  test('should create a new Store instance', () => {
    const storeBuild = new StoreBuilder('69.252.249/0001-90')
      .setName('John Doe')
      .setPhone('31999999999')
      .setUserId('abcdefg')
      .setCep('12345-678');

    const store = new Store(storeBuild);
    expect(store).toBeInstanceOf(Store);
    expect(store.name).toBe(store.name);
    expect(store.cnpj).toBe(store.cnpj);
    expect(store.phone).toBe(store.phone);
    expect(store.userId).toBe(store.userId);
    expect(store.cep).toBe(store.cep);
  });

  test('should set the cep', () => {
    const storeBuild = new StoreBuilder('69.252.249/0001-90')
      .setName('John Doe')
      .setPhone('31999999999')
      .setUserId('abcdefg')
      .setCep('12345-678');

    const store = new Store(storeBuild);
    const newCep = '98765-432';
    store.cep = newCep;
    expect(store.cep).toBe(newCep);
  });

  test('should set the name', () => {
    const storeBuild = new StoreBuilder('69.252.249/0001-90')
      .setName('John Doe')
      .setPhone('31999999999')
      .setUserId('abcdefg')
      .setCep('12345-678');

    const store = new Store(storeBuild);
    const newName = 'New Store Name';
    store.name = newName;
    expect(store.name).toBe(newName);
  });

  test('should set the phone', () => {
    const storeBuild = new StoreBuilder('69.252.249/0001-90')
      .setName('John Doe')
      .setPhone('31999999999')
      .setUserId('abcdefg')
      .setCep('12345-678');

    const store = new Store(storeBuild);
    const newPhone = '0987654321';
    store.phone = newPhone;
    expect(store.phone).toBe(newPhone);
  });

  test('should throw an error a invalid cnpj', function () {
    expect(() =>
      new StoreBuilder('123456')
        .setName('John Doe')
        .setUserId('abcdefg')
        .setCep('12345-678')
        .setPhone('31999999999')

        .build()
    ).toThrowError('CNPJ inválido');
  });
});