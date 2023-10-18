import Name from '../../../../src/entities/valueObjects/Name';

describe('# Unit - ValueObjects => Name', function () {
  test('should create a valid Name', function () {
    const name = Name.fromString('John Lennon');
    expect(name.value).toBe('John Lennon');
  });

  test('should throw an error when create a invalid Name using ""', function () {
    expect(() => Name.fromString('')).toThrowError('Invalid Name');
  });

  test('should throw an error when create a invalid Name with "Ze"', function () {
    expect(() => Name.fromString('J')).toThrowError('Invalid Name');
  });

  test('should throw an error when create a invalid Name with special characters "Thi@go"', function () {
    expect(() => Name.fromString('John Lennon!')).toThrowError('Invalid Name');
  });

  test('should throw an error when create a invalid Name with numbers "Thi4go"', function () {
    expect(() => Name.fromString('John Lennon4')).toThrowError('Invalid Name');
  });
});

