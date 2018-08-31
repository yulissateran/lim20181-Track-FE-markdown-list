const mdLinks = require('../lib/index.js');

jest.setTimeout(25000);
describe('mdLinks', () => {
  test('debería retornar un array de objetos con la propiedad href, text y path para un directorio',
    () => mdLinks(__dirname)
      .then(array => expect(array).toContainEqual({
        href: 'https://github.com/yulissateran/lim-2018-05-bc-core-am-datadashboard',
        path: 'C:\\Users\\YulissaLiliana\\Documents\\lim20181-Track-FE-markdown-list\\test\\readmes-test\\README.2.md',
        text: 'repositorio22',
      })));
  test('debería retornar un array de objetos con la popiedad href, text y path para un archivo',
    () => mdLinks('test/readmes-test/README.md', { stats: false, validate: false })
      .then(array => expect(array).toContainEqual({
        text: 'Node.js',
        href: 'https://nodejs.org/en/',
        path: 'C:\\Users\\YulissaLiliana\\Documents\\lim20181-Track-FE-markdown-list\\test\\readmes-test\\README.md'
      })));
  test('debería retornar un objeto de error para un directorio inexistente',
    () => mdLinks('test/readmes-test/readmes-test.1', { stats: false, validate: false })
      .catch(err => expect(typeof err).toEqual('object')));
  test('debería retornar un objeto de error para un archivo inexistente',
    () => mdLinks('test/readmes-test/READMA.md', { stats: false, validate: false })
      .catch(err => expect(typeof err).toEqual('object')));
  test('debería retornar [{"total": 10, "unique": 9}] para __dirname --stats',
    () => mdLinks(__dirname, { stats: true, validate: false })
      .then(array => expect(array).toContainEqual({ total: 10, unique: 9 })));

  test('debería retornar un array de objetos con la popiedad href, text ,path y status para __dirname --validate',
    () => mdLinks(__dirname, { stats: false, validate: true })
      .then(array => expect(array).toContainEqual({
        text: 'cifrado César',
        href: 'https://en.wikipedia.org/wiki/Caesar_cipher',
        path: 'C:\\Users\\YulissaLiliana\\Documents\\lim20181-Track-FE-markdown-list\\test\\readmes-test\\README.1.md',
        status: 'OK 200'
      })));

  test('debería retornar: [{broken: 2, total: 10, unique: 9}] para __dirname --stats --validate',
    () => mdLinks(__dirname, { stats: true, validate: true })
      .then(array => expect(array).toContainEqual({ broken: 2, total: 10, unique: 9 })));
});
