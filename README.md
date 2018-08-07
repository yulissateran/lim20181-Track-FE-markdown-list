# Markdown Links

## Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers, y es usado en un montón de plataformas que
manejan texto plano en la web (GitHub, foros, blogs, ...).

Es muy común encontrar varios archivos en formato `Markdown` en cualquier tipo
de repositorio (empezando por el tradicional `README.md`). Estos archivos
`Markdown` normalmente contienen _links_ (vínculos), y desgraciadamente a veces
estos links están rotos o ya no son válidos.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/) para leer y analizar archivos
en formato `Markdown` y verificar los links, así como reportar una serie de
estadísticas.

![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)

## Introducción

Hasta el momento hemos trabajado con javascript desde el navegador, sin embargo hemos oído hablar de Node.js como tecnología que permite trabajar con Javascript del lado del servidor.
Para este proyecto haremos uso de Node.js que a través de sus diferentes módulos `path, filesystem, node-fetch, etc` nos ayudará a construir nuestra librería

## Objetivos

El objetivo práctico de este reto es que aprendas cómo crear tu propia librería
(o biblioteca - _library_) en JavaScript.
Diseñar tu propia librería es una experiencia fundamental para cualquier
desarrollador ya que te obliga a pensar en la interfaz (API) de tus _módulos_,
cómo serán usados por otras personas, ... y tener especial consideración en
peculiaridades del lenguaje, convenciones y buenas prácticas.

## Consideraciones generales

Este proyecto se debe "resolver" de manera individual.
La librería debe estar implementada en JavaScript para ser ejecutada con
Node.js.

## Parte obligatoria

La aplicación debe exponer un ejecutable _archivo cli_ que podamos invocar en la línea de
comando, además de una API programático para poder usar el módulo como
dependencia desde otros scripts.

Los tests unitarios deben cubrir un mínimo del 70% de _statements_, _functions_,
_lines_ y _branches_.

Para comenzar este proyecto tendrás que hacer un _fork_ y _clonar_ este
repositorio.

Una vez creados los equipos, es hora de crear un plan de acción. Esto debería
quedar detallado en el `README.md` de tu repo así como en una serie de _issues_
y _milestones_ para coordinar el trabajo y poder hacer seguimiento del progreso.

Dentro de cada _milestone_ se crearán y asignarán los _issues_ que cada equipo
considere necesario. Como parte del proyecto, tendrás que:

- Hacer un _pre-release_ (una versión _alpha_ o _beta_)
- Conseguir que algunos _usuarios_ usen la herramienta (valga la redundancia)
- Recibir feedback (feature requests, bugs, ...) y actuar sobre ese feedback
- Preparar un primer release estable (`v1.0.0`)

Para este proyecto necesitarás revisar los siguientes tópicos

Tópicos:

- [Node.js](https://nodejs.org/en/)
- [Node.js y npm](https://www.genbeta.com/desarrollo/node-js-y-npm)
- [Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?](http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175)
- [Semver](https://semver.org/)
- [Path](https://nodejs.org/api/path.html)
- [File System](https://nodejs.org/api/fs.html)
- [marked](https://github.com/markedjs/marked)
- [Asíncronía en js](https://carlosazaustre.com/manejando-la-asincronia-en-javascript/)

### Documentación

- Descripción general de la librería.
- Instrucciones de instalación.
- Versiones de la librería.
- Documentación de la Librería (Features, link de Demo, test, etc...).
- Ejemplos (snippets) de uso.

### Archivos del proyecto

- `README.md` con descripción del módulo, instrucciones de instalación, uso y
  documentación del API.
- `index.js`: Desde este archivo debes exportar una función (`mdLinks`).
- `package.json` con nombre, versión, descripción, autores, licencia,
  dependencias, scripts (pretest, test, ...)
- `.editorconfig` con configuración para editores de texto. Este archivo no se
  debe cambiar.
- `.eslintrc` con configuración para linter. Este archivo no
  se debe cambiar.
- `.gitignore` para ignorar `node_modules` u otras carpetas que no deban
  incluirse en control de versiones (`git`).
- `test/md-links.spec.js` debe contener los tests unitarios para la función
  `mdLinks()`tu inplementación debe pasar estos tets.

### JavaScript API

El módulo debe poder importarse en otros scripts de Node.js y debe ofrecer la
siguiente interfaz:

#### `mdLinks(path, options)`

![img_20180807_161238402](https://user-images.githubusercontent.com/32286663/43803949-faa92368-9a5f-11e8-95d8-181de7121d34.jpg)

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo markdown. Si la ruta pasada es relativa, debe resolverse como relativa al directorio desde donde se invoca node - _currentworking directory_).

- `options`: Un objeto con las siguientes propiedades:
  - `validate`: Valor que determina si se desea validar los links encontrados en el archivo.
  - `stats`: Valor que determina si se desea calcular los stats de de los links encontrados en el archivo.

##### Valor de retorno

La función debe retornar una promesa (`Promise`) que resuelva a un arreglo
(`Array`) de objetos (_Object_), donde cada objeto representa un link y contiene
las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.

#### Ejemplo

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { stats: true })
  .then(links => {
    // => [{ href, text, file, total, unique, domains }]
  })
  .catch(console.error);
```

### CLI

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la consola:

`md-links <path-to-file> [options]`

![img_20180807_165632844](https://user-images.githubusercontent.com/32286663/43805090-1d60faee-9a64-11e8-974d-78f0382f7bc0.jpg)

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## Entregables

Módulo instalable via `npm install <github-user>/md-links`. Este módulo debe
incluir tanto un ejecutable como una interfaz que podamos importar con `require`
para usarlo programáticamente.

## Hacker edition

Una vez que tengas el entregable

- Implementar la librería para que pueda recibir como path(ruta) una carpeta/directorio con diversos archivos para que pueda buscar y encontrar los links de todos archivos markdown encontrados dentro de la carpeta/directorio.

## Pistas / Tips

- [Marked](https://github.com/markedjs/marked/blob/master/docs/USING_PRO.md)
- [NPM](https://docs.npmjs.com/getting-started/what-is-npm)
- [Publicar packpage](https://docs.npmjs.com/getting-started/publishing-npm-packages)
- [Crear módulos en Node.js](https://docs.npmjs.com/getting-started/publishing-npm-packages)
- [Leer un archivo](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)
- [Leer un Directorio](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)
- [Path](https://nodejs.org/api/path.html)
- [Linea de comando CLI](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)
