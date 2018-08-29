# Markdown Links

Los archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Por esto se creó `yulissateran-md-links`, que lee y analiza archivos
en formato `Markdown`, verifica los links que contienen y reporta
algunas estadísticas.

## Instalación

`npm install yulissateran-md-links`

### CLI (Línea de comando)

El ejecutable de nuestra aplicación se ejecuta de la siguiente
manera a través de la terminal:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./example/example.md
./example/example.md http://algo.com/2/3/ Link a algo
./example/example.md https://otra-cosa.net/algun-doc.html algún doc
./example/example.md http://google.com/ Google
```

El comportamiento por defecto no valida si las URLs responden ok o no,
solo identifica el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprime los links que va
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo  hace una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces considera el link como ok.

Por ejemplo:

```sh
$ md-links ./example/example.md --validate
./example/example.md http://algo.com/2/3/ ok 200 Link a algo
./example/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./example/example.md http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) es un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./example/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./example/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

### Uso en tu proyecto


#### Ejemplos

```js
const mdLinks = require("yulissateran-md-links");

mdLinks("./example/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./example/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./example/example.md", { stats: true })
  .then(links => {
    // => [{ href, text, file, total, unique, domains }]
  })
  .catch(console.error);

mdLinks("./example/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```


##### Argumentos
- `path`: Ruta absoluta o relativa al archivo o directorio. Si la ruta pasada es relativa, se resuelve como relativa al directorio desde donde se invoca node - _currentworking directory_).

- `options`: Un objeto con las siguientes propiedades:
  - `validate`: Valor que determina si se desea validar los links encontrados en el archivo. (tipo de dato booleano)
  - `stats`: Valor que determina si se desea calcular los stats de de los links encontrados en el archivo. (tipo de dato booleano)


##### Valor de retorno

La función retorna una promesa (`Promise`) que resuelve a un arreglo
(`Array`) de objetos (_Object_), donde cada objeto representa un link y contiene
las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.
