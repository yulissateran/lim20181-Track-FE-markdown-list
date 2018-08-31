# Markdown Links

Los archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

He ahí la utilidad de esta librería, `yulissateran-md-links` lee y analiza archivos
en formato `Markdown`, verifica los links que contienen y reporta
algunas estadísticas.

## Instalación

`npm install yulissateran-md-links`

### CLI (Línea de comando)

La librería se ejecuta de la siguiente
manera a través de la terminal:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./example/example.md
./example/example.md http://algo.com/2/3/  Link a algo
./example/example.md https://otra-cosa.net/algun-doc.html  algún doc
./example/example.md http://google.com/  Google
```

El comportamiento por defecto no valida si las URLs responden OK o no,
solo identifica el archivo markdown (a partir de la ruta que recibe como
argumento), analiza el archivo Markdown e imprime los links que va
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo  hace una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces considera el link como _OK_. Si el link está mal escrito o no encuentra link,
entonces considerará el link como  _Not Found Link_

Por ejemplo:

```sh
$ md-links ./example/example.md --validate
./example/example.md http://link.com/2/3/ OK 200 Una web de algo
./example/example.md https://link-link.net/link-doc.html Not Found 404 Gitlab
./example/example.md http://link.com/ OK 301 Facebook
./example/example.md esto.noesunlink.es Not Found Link Github
```

Vemos que el _output_ en este caso incluye la expresión `OK` o `Not Found` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) es un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./example/example.md --stats
total: 3 | unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./example/example.md --stats --validate
total: 3 | unique: 3 | broken: 1
```

### API    
 `mdLinks(path, opts)`


#### Ejemplos

```js
const mdLinks = require("yulissateran-md-links");

mdLinks("./example/example.md")
  .then(links => {
    // => [{ href, text, path }]
  })
  .catch(console.error);

mdLinks("./example/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, path, status}]
  })
  .catch(console.error);

mdLinks("./example/example.md", { stats: true })
  .then(links => {
    // => [{ total, unique}]
  })
  .catch(console.error);

 mdLinks("./example/example.md", { stats: true, validate: true })
  .then(links => {
    // => [{ total, unique, broken }]
  })
  .catch(console.error); 

mdLinks("./example/dir")
  .then(links => {
    // => [{ href, text, path }]
  })
  .catch(console.error);
```


##### Argumentos
- `path`: Ruta absoluta o relativa al archivo o directorio. Si la ruta pasada es relativa, se resuelve como relativa al directorio desde donde se invoca node - (_currentworking directory_).

- `options`: Un objeto con las siguientes propiedades:
  - `validate`: Valor que determina si se desea validar los links encontrados en el archivo. (tipo de dato booleano)
  - `stats`: Valor que determina si se desea calcular los stats de de los links encontrados en el archivo. (tipo de dato booleano)


##### Valor de retorno  

#### `mdLinks(path)`
La función retorna una promesa (`Promise`) que resuelve a un arreglo
(`Array`) de objetos (_Object_), donde cada objeto representa un link y contiene
las siguientes propiedades:
- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `path`: Ruta del archivo donde se encontró el link.

#### `mdLinks(path,{ validate: true })`
La función retorna una promesa (`Promise`) que resuelve a un arreglo
(`Array`) de objetos (_Object_), donde cada objeto representa un link y contiene
las siguientes propiedades:
- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `path`: Ruta del archivo donde se encontró el link.
- `status`: Status y statusText de la respuesta a la petición HTTP (`OK 200`).

#### `mdLinks(path,{ stats: true })`
La función retorna una promesa (`Promise`) que resuelve a un arreglo
(`Array`) de un único objeto (_Object_) que contiene
las siguientes propiedades:
- `total`: Número de links encontrados en el archivo o carpeta.
- `unique`: Número de links únicos encontrados en el archivo o carpeta.

#### `mdLinks(path,{ validate: true, stats : true})`

La función retorna una promesa (`Promise`) que resuelve a un arreglo
(`Array`) de un único objeto (_Object_) que contiene
las siguientes propiedades:
- `total`: Número de links encontrados en el archivo o carpeta.
- `unique`: Número de links únicos encontrados en el archivo o carpeta.
- `broken`: Número de links rotos ( `status`: `Not Found 404`)


## Versión actual de la librería 
 1.3.0

## Board de backlog para la implementación de la librería.
- [Sprint 1](https://github.com/yulissateran/lim20181-Track-FE-markdown-list/projects/3)
- [Sprint 2](https://github.com/yulissateran/lim20181-Track-FE-markdown-list/projects/4)
