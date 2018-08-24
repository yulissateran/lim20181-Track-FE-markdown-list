// const jest = require('jest');
const markdownLinks = require('../src/index.js');
const path = require('path');
const mdLinks = markdownLinks.mdLinks;
const linkProcessor = markdownLinks.linkProcessor;
const tagsExtractor = markdownLinks.tagsExtractor;
const pathReadme = path.resolve('../README.md');


test('Debería retornar un arreglo de 3 etiquetas html <a>', () => {
  // eslint-disable-next-line no-undef
  expect(tagsExtractor(textMd)).toEqual(arrayTagsLinks);
});
test('Debería retornar un array de 3 objetos con las propiedades href, path, texto', () => {
  // eslint-disable-next-line no-undef
  expect(linkProcessor(arrayTagsLinks, [], pathReadme)).toEqual(arrayObjectsLink);
});
test('Debería retornar una promesa que se resuelva a un array de objetos', () => {
  // eslint-disable-next-line no-undef
  // expect.assertions(1);
  mdLinks('README.md').then(data => {
    // eslint-disable-next-line no-undef
    expect(data).toEqual(arrayObjectsLinkReadme);
  });
});