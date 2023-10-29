import { characters } from '../../src/js-foundation/02-destructuring';
describe('js-foundation/02-destructuring.ts', () => {
  const [flash, superman] = characters;

  test('characters should contain Superman and Flash', () => {
    expect(characters).toContain('Superman');
    expect(characters).toContain('Flash');
  });

  test('character should contain in first position Flash and Superman next ', () => {
    expect(flash).toBe('Flash');
    expect(superman).toBe('Superman');
  });
});
