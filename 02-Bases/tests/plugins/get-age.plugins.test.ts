import { getAge } from '../../src/plugins';

describe('plugins/get-age.plugins.ts', () => {
  test('getAge should return a number ', () => {
    const age = getAge('1996-01-22');
    expect(typeof age).toBe('number');
  });

  test('getAge should return the age of a person ', () => {
    const birthDate = '1996-01-22';
    const age = getAge(birthDate);
    expect(typeof age).toBe('number');
  });

  test('getAge should return 0 (years)', () => {
    const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1995);

    const birthDate = '1995-10-21';
    const age = getAge(birthDate);

    // 1995 -1995
    expect(age).toBe(0);
  });
});
