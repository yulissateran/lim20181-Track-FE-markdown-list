const marked = require('marked');
const fs = require('fs');
// const path = require('path');
const dir = require('node-dir');
const http = require('http');
// process.on('message', function (n) {
//   if (n === 42) {
//       console.log('yes that is the answer');
//   } else {
//       console.log('nope');
//   }
// });
// process.on('disconnect', function (a, b) {
//   console.log('okay, goodbye');
// });
const req = http.request({
  hostname: 'www.google.com'
}, (res) => {
  console.log(res.statusCode);
});
req.end();

/* Toma el arreglo de objetos [{links: [link, link], path: path}] e invoca a la función
  linkProcessor(links, array, route) con las propiedades de cada objeto por  medio de recursividad */
const processorLinksDirectory = (arrayContentFiles, array) => {
  const links = arrayContentFiles[0].link;
  const route = arrayContentFiles[0].path;
  linkProcessor(links, array, route);
  arrayContentFiles.shift();
  if (arrayContentFiles.length > 0) {
    processorLinksDirectory(arrayContentFiles, array);
  }
  return array;
};

/* toma el arreglo de rutas de archivos md y retorna un arreglo de objetos con propiedad links y path*/
const readFile = (pathsArray, arrayContentFiles) => {
  const content = fs.readFileSync(pathsArray[0], 'utf-8');
  const objectFile = {
    link: tagsExtractor(content),
    path: pathsArray[0]
  };
  arrayContentFiles.push(objectFile);
  pathsArray.shift();
  if (pathsArray.length > 0) {
    readFile(pathsArray, arrayContentFiles)
  }
  return arrayContentFiles;
};
/* toma el arreglo de rutas de archivos existentes dentro de una carpeta 
y sus subscarpetas y retorna todos los que sean .md */
const matchFileMd = (arrayFilesMd, files) => {
  files[0].match(/.md$/) ? arrayFilesMd.push(files[0]) : arrayFilesMd;
  files.shift()
  if (files.length >= 1) {
    matchFileMd(arrayFilesMd, files)
  }
  return arrayFilesMd;
};
/* Recibe la ruta de una carpeta ,obtiene un arreglo con las rutas 
de todos los archivos anidados existentes y se loa pasa a la función 
que filtrará los archivos .md . Con ese resultado invoca a la función 
que retornará los links existentes y la ruta de cada archivo en un arreglo de objetos,
con ese arreglo se invocará a la función que retornará el array de objetos {text,link, path}*/
const filesDirectory = (directory) => {
  return new Promise((resolve, reject) => {
    dir.files(directory, (err, files) => {
      if (err) reject(err);
      const array = [];
      const arrayFilesMd = [];
      const arrayLinks = [];
      const filesMd = matchFileMd(arrayFilesMd, files);
      const arrayContentFiles = readFile(filesMd, array)
      const response = processorLinksDirectory(arrayContentFiles, arrayLinks)
      resolve(response);
    });
  });
};
/* Toma el arreglo de links y la ruta de un archivo y los agrega a un 
arreglo de objetos con las prop: {text: text, href: href, path: path} */
const linkProcessor = (links, array, absolutePath) => {
  const text = ((/<a.*>(.*)<\/a>/g.exec(links[0]))[1]);
  const url = links[0].match(/(http:\/\/|https:\/\/|www\.|ftp:\/\/)[^\s"]+/gi);
  const objectLink = {
    text,
    url: url.pop(),
    pathFile: absolutePath
  };
  array.push(objectLink);
  links.shift();
  if (links[0]) {
    linkProcessor(links, array, absolutePath);
  }
  return array;
};

/* convierte el contenido markdown a html y retorna todos los links encontrados en un array*/
const tagsExtractor = (data) => {
  return marked(data).match(/<a.*>(.*)<\/a>/g);
};

/* se ejecuta si la ruta es de un archivo*/
const readFileSingle = (absolutePath) => {
  // eslint-disable-next-line
  return new Promise((resolve, reject) => {
    const contentFile = fs.readFileSync(absolutePath, 'utf-8');
    const arrayOfObjects = [];
    const linksArray = tagsExtractor(contentFile);
    if (linksArray) {
      resolve(linkProcessor(linksArray, arrayOfObjects, absolutePath));
    } else {
      reject('hubo un error');
    }
  });
};
/* Identifica si la ruta es de un archivo o directorio */
const routeIdentifier = (path) => {
  // const fd = fs.openSync(path, 'r');
  const stats = fs.statSync(path);
  const response = stats.isDirectory() ? filesDirectory(path) : readFileSingle(path);
  return response;
};
routeIdentifier('carpeta').then((response) => {
  console.log(response, response.length);
}).catch((error) => {
  console.log(error);
});

// exports.mdLinks = mdLinks;
// exports.tagsExtractor = tagsExtractor;
// exports.linkProcessor = linkProcessor;
// module.exports = exports;
/* termina*/

// mdLinks(absolutePath).then((response) => {
//   console.log(response, response.length);
// }).catch((err)=>{
//   console.log(err);
// });


// exports = main;
// const routeVerifier = (absolutePath) =>{
//   if(path.isAbsolute(absolutePath)){
//      return {pathOriginal: absolutePath, newPath: absolutePath}
//   }else{
//   return {pathOriginal: absolutePath,newPath: path.resolve(absolutePath)}
//   }
// }
// const openPath = fs.openSync(absolutePath, 'r'); 
// const statePath = fs.
/* termina*/

// mdLinks(absolutePath).then((response) => {
//   console.log(response, response.length);
// }).catch((err)=>{
//   console.log(err);
// });


// exports = main;
// const routeVerifier = (absolutePath) =>{
//   if(path.isAbsolute(absolutePath)){
//      return {pathOriginal: absolutePath, newPath: absolutePath}
//   }else{
//   return {pathOriginal: absolutePath,newPath: path.resolve(absolutePath)}
//   }
// }
// const openPath = fs.openSync(absolutePath, 'r'); 
// const statePath = fs.fstatSync(openFile);

// console.log(path.resolve(route));
// const procesedLinks =(links) =>{
//   const count = 0;
//   // console.log(/<a.*>(.*)<\/a>/g.exec(links[count])[1])
//   // console.log(links[count].match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/([\w#!:.?+=&%@!\-/]+)?)/gi))
// };

// // verifica si la ruta es de un archivo
// const stateFile = (err, stat) => {
//   if (err) throw err;
//   if (stat.isFile()) {
//     console.log(stat);
//     fs.readFile(absolutePath, 'utf8', readLinks);
//   }
// };

// // Busca los liks en el contenido del arhivo
// const readLinks = (err, data) => {
//   if (err) throw err;
//   const links = marked(data).match(/<a.*>(.*)<\/a>/g);
//   console.log(links, links.length);
//   return procesedLinks(links);
// };

// const open = (absolutePath) => {
//   // eslint-disable-next-line
//   return new Promise((resolve, reject) => {
//     fs.open(absolutePath, 'r', (err, fd) => {
//       console.log(absolutePath);
//       if (err) reject(err);
//       console.log(fd);
//       resolve(fs.fstat(fd, stateFile));
//     });
//   });
// };
// module.exports = open;
// 2

// const closeFile = (fd) => {
//   fs.close(fd, (err) => {
//     if (err) throw err;
//   });
// };

// fs.open(file, 'r', (err, fd) => {
//   if (err) throw err;
//   fs.fstat(fd, stateFile);
//   closeFile(fd);
// });


// fs.open('../README.md', 'r', (err, fd) => {
//   if (err) throw err;
//   console.log(fd);
//   fs.fstat(fd, (err, stats) => {
//     if (err) throw err;
//     if (stats.isFile()) {
//       fs.readFile('../README.md', 'utf8', (err, data) => {
//         if (err) throw err;       
//         // const semantic = data.match(/\[(.*?)\]\(.*?\)/gm);
//         // const links = data.match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/])?)/gi);
//         const links = data.match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/([\w#!:.?+=&%@!\-/]+)?)/gi);
//         // console.log(links, links.length);
//         return data;
//       });
//     }
//     // console.log(stats);
//     fs.close(fd, (err) => {
//       console.log(fd);
//       if (err) throw err;
//     });
//   });
// });