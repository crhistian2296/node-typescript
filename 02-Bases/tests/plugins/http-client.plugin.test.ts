import { httpClient } from '../../src/plugins';

describe('plugin/http-client.plugin.ts', () => {
  test('httpClientPlugin.get should return a string', async () => {
    let data = await httpClient.get('https://jsonplaceholder.typicode.com/todos/1');

    const resp = {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    };

    expect(data).toStrictEqual(resp);
  });

  test('httpClientPlugin.post should be type "funcion"', async () => {
    expect(typeof httpClient.post).toBe('function');
  });

  test('httpClientPlugin.put should be type "funcion', async () => {
    expect(typeof httpClient.put).toBe('function');
  });

  test('httpClientPlugin.delete should be type "funcion', async () => {
    expect(typeof httpClient.delete).toBe('function');
  });

  // test('httpClientPlugin should return resp "ok" and 200', async () => {
  //   let res = await fetch('https://jsonplaceholder.typicode.com/todos/1');

  //   expect(res.status).toEqual(200);
  //   expect(res.statusText).toEqual('OK');
  // });
});
