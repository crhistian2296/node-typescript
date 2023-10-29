import { getUserById } from '../../src/js-foundation/03-callbacks';
describe('js-foundation/03-callbacks.ts', () => {
  test('getUserById should return an error if user does not exist', () => {
    // expect(true).toBe(true);
    const id = 10;
    getUserById(id, (err, user) => {
      expect(err).toBe(`User not found with id ${id}`);
      expect(user).toBeUndefined();
    });
  });
});
