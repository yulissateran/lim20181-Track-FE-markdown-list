const mdLinks = require('../lib/index.js');
jest.setTimeout(25000);
describe('mdLinks', () => {

  test('debería retornar un array de objetos con la popiedad href, text y path', async () => {
    return await mdLinks(__dirname, { state: false, validate: false })
      // eslint-disable-next-line no-undef
      .then(data => expect(data).toContainEqual({
        "href": "https://github.com/yulissateran/lim-2018-05-bc-core-am-datadashboard",
        "path": "C:\\Users\\YulissaLiliana\\Documents\\lim20181-Track-FE-markdown-list\\test\\readmes-test\\README.2.md",
        "text": "repositorio22",
      }));
  });

  test('debería retornar : total: 10 | unique : 9 ', async() => {
    return await mdLinks(__dirname, { state: true, validate: false })
      // eslint-disable-next-line no-undef
      .then(res => expect(res).toEqual(' total: 10 | unique : 9 '));
  });
  test('debería retornar un array de objetos con la popiedad href, text ,path y status', async() => {
    return await mdLinks(__dirname, { state: false, validate: true })
      // eslint-disable-next-line no-undef
      .then(res => expect(res).toContainEqual({
        "text": 'cifrado César',
        "href": 'https://en.wikipedia.org/wiki/Caesar_cipher',
        "path": 'C:\\Users\\YulissaLiliana\\Documents\\lim20181-Track-FE-markdown-list\\test\\readmes-test\\README.1.md',
        "state": 'OK 200'
      }));
  });
  test('debería retornar: total: 10 | unique : 9  | broken: 1', async() => {
    return await mdLinks(__dirname, { state: true, validate: true })
      // eslint-disable-next-line no-undef
      .then(res => expect(res).toEqual(' total: 10 | unique : 9  | broken: 1'));
  });
});
