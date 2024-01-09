import Category from '../../../src/entities/Category';

describe('# Unit - Entities => Category', function () {
  it('should create a valid Category', function () {
    const category = new Category('Eletronics');
    expect(category.name.value).toBe('Eletronics');
  });
  it('should throw an error when create a invalid Category with length < 3', function () {
    expect(() => new Category('N')).toThrowError('Invalid Category');
  });
  it('should throw an error when create a invalid Category with special chars', function () {
    expect(() => new Category('Eletronics!')).toThrowError('Invalid Category');
  });
  it('should throw an error when create a invalid Category with numbers', function () {
    expect(() => new Category('Eletronics 1')).toThrowError('Invalid Category');
  });
});