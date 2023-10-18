import Payment from '../../../src/entities/Payment';

describe('# Unit - Entity => Payment', function () {
  test('should create a valid Payment', function () {
    const payment = new Payment('Cartão de crédito');
    expect(payment.name).toBe('Cartão de crédito');
  });

  test('should throw an error when create a invalid Payment using ""', function () {
    expect(() => new Payment('')).toThrowError('Invalid Name');
  });

  test('should throw an error when create a invalid Payment with 2 characters "ze"', function () {
    expect(() => new Payment('J')).toThrowError('Invalid Name');
  });

  test('should throw an error when create a invalid Payment with special characters "C@rtão"', function () {
    expect(() => new Payment('C@rtão')).toThrowError('Invalid Name');
  });
});