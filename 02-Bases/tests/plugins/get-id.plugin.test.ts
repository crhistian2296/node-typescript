import { getUUID } from '../../src/plugins';

describe('plugins/get-id.plugin.ts', () => {
  test('getUUID should return an UUID', () => {
    const key = getUUID();

    expect(typeof key).toEqual('string');
    expect(key.length).toEqual(36);
  });
});
