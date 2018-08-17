// const jest = require('jest');
const markdownLinks = require('../src/index.js');
const path = require('path');
const mdLinks = markdownLinks.mdLinks;
const linkProcessor = markdownLinks.linkProcessor;
const tagsExtractor = markdownLinks.tagsExtractor;
const pathReadme = path.resolve('../README.md');
const arrayObjectsLinkReadme = [{
  text: 'Markdown',
  url: 'https://es.wikipedia.org/wiki/Markdown',
  pathFile: 'README.md'
},
{
  text: 'Node.js',
  url: 'https://nodejs.org/',
  pathFile: 'README.md'
},
{
  text: 'Node.js',
  url: 'https://nodejs.org/es/',
  pathFile: 'README.md'
},
{
  text: 'motor de JavaScript V8 de Chrome',
  url: 'https://developers.google.com/v8/',
  pathFile: 'README.md'
},
{
  text: 'Jest',
  url: 'https://jestjs.io/',
  pathFile: 'README.md'
},
{
  text: 'Node.js',
  url: 'https://nodejs.org/en/',
  pathFile: 'README.md'
},
{
  text: 'Node.js y npm',
  url: 'https://www.genbeta.com/desarrollo/node-js-y-npm',
  pathFile: 'README.md'
},
{
  text: 'Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?',
  url: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
  pathFile: 'README.md'
},
  {
    text: 'Módulos(CommonJS)',
    url: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html',
    pathFile: 'README.md'
  },
  {
    text: 'Semver',
    url: 'https://semver.org/',
    pathFile: 'README.md'
  },
  {
    text: 'Path',
    url: 'https://nodejs.org/api/path.html',
    pathFile: 'README.md'
  },
  {
    text: 'File System',
    url: 'https://nodejs.org/api/fs.html',
    pathFile: 'README.md'
  },
  {
    text: 'marked',
    url: 'https://github.com/markedjs/marked',
    pathFile: 'README.md'
  },
  {
    text: 'Asíncronía en js',
    url: 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/',
    pathFile: 'README.md'
  },
  {
    text: 'Marked',
    url: 'https://github.com/markedjs/marked/blob/master/docs/USING_PRO.md',
    pathFile: 'README.md'
  },
  {
    text: 'NPM',
    url: 'https://docs.npmjs.com/getting-started/what-is-npm',
    pathFile: 'README.md'
  },
  {
    text: 'Publicar packpage',
    url: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
    pathFile: 'README.md'
  },
  {
    text: 'Crear módulos en Node.js',
    url: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
    pathFile: 'README.md'
  },
  {
    text: 'Leer un archivo',
    url: 'https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback',
    pathFile: 'README.md'
  },
  {
    text: 'Leer un Directorio',
    url: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
    pathFile: 'README.md'
  },
  {
    text: 'Path',
    url: 'https://nodejs.org/api/path.html',
    pathFile: 'README.md'
  },
  {
    text: 'Linea de comando CLI',
    url: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    pathFile: 'README.md'
  },
  {
    text: 'learnyounode',
    url: 'https://github.com/workshopper/learnyounode',
    pathFile: 'README.md'
  },
  {
    text: 'how-to-npm',
    url: 'https://github.com/workshopper/how-to-npm',
    pathFile: 'README.md'
  },
  {
    text: 'promise-it-wont-hurt',
    url: 'https://github.com/stevekane/promise-it-wont-hurt',
    pathFile: 'README.md'
  },
  {
    text: 'Acerca de Node.js - Documentación oficial',
    url: 'https://nodejs.org/es/about/',
    pathFile: 'README.md'
  },
  {
    text: 'Node.js file system - Documentación oficial',
    url: 'https://nodejs.org/api/fs.html',
    pathFile: 'README.md'
  },
  {
    text: 'Node.js http.get - Documentación oficial',
    url: 'https://nodejs.org/api/http.html#http_http_get_options_callback',
    pathFile: 'README.md'
  },
  {
    text: 'Node.js - Wikipedia',
    url: 'https://es.wikipedia.org/wiki/Node.js',
    pathFile: 'README.md'
  },
  {
    text: 'What exactly is Node.js? - freeCodeCamp',
    url: 'https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5',
    pathFile: 'README.md'
  },
  {
    text: '¿Qué es Node.js y para qué sirve? - drauta.com',
    url: 'https://www.drauta.com/que-es-nodejs-y-para-que-sirve',
    pathFile: 'README.md'
  },
  {
    text: '¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube',
    url: 'https://www.youtube.com/watch?v=WgSc1nv_4Gw',
    pathFile: 'README.md'
  },
  {
    text: '¿Simplemente qué es Node.js? - IBM Developer Works, 2011',
    url: 'https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html',
    pathFile: 'README.md'
  }]
const textMd = `Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato Markdown, para verificar los links que contengan y reportar
algunas estadísticas.
![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)
## Introducción
[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript
construido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).
Esto nos va a permitir ejecuta JavaScript en el entorno del sistema operativo,
ya sea tu máquina o un servidor, lo cual nos abre las puertas para poder interactuar con
el sistema operativo, sistema de archivos, redes, ...
En este proyecto nos alejamos un poco del navegador para construir un programa
que se ejecute usando Node.js, donde aprenderemos sobre cómo interactuar con el
sistema archivos, con el entorno (proceso, env, stdin/stdout/stderr), ...`;
const arrayTagsLinks = ['<a href="https://nodejs.org/">Node.js</a>',
  '<a href="https://nodejs.org/es/">Node.js</a>',
  '<a href="https://developers.google.com/v8/">motor de JavaScript V8 de Chrome</a>'];
const arrayObjectsLink = [
  {
    text: 'Node.js',
    url: 'https://nodejs.org/',
    pathFile: '..\\README.md'
  },
  {
    text: 'Node.js',
    url: 'https://nodejs.org/es/',
    pathFile: '..\\README.md'
  },
  {
    text: 'motor de JavaScript V8 de Chrome',
    url: 'https://developers.google.com/v8/',
    pathFile: '..\\README.md'
  }]
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
  return mdLinks('README.md').then(data => {
    // eslint-disable-next-line no-undef
    expect(data).toEqual(arrayObjectsLinkReadme);
  });
});