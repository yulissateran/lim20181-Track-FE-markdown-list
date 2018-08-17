const marked = require('marked');
const fs = require('fs');
const path = require('path');
// const route = '../README.md';
// const absolutePath = path.resolve(route);
const linkProcessor = (links, array, absolutePath) => {
  const text = ((/<a.*>(.*)<\/a>/g.exec(links[0]))[1]);
  const url = links[0].match(/(http:\/\/|https:\/\/|www\.|ftp:\/\/)[^\s"]+/gi)
  const objectLink = {
    text,
    url: url.pop(),
    pathFile: path.relative('', absolutePath)
  };
  array.push(objectLink);
  links.shift();
  if (links.length >= 1) {
    linkProcessor(links, array, absolutePath);
  }
  console.log(array);
  return array;
};

const tagsExtractor = (data) => {
  return marked(data).match(/<a.*>(.*)<\/a>/g);
};

const mdLinks = (absolutePath) => {
  // eslint-disable-next-line
  return new Promise((resolve, reject) => {
    const contentFile = fs.readFileSync(absolutePath, 'utf-8');
    const arrayOfObjects = [];
    const linksArray = tagsExtractor(contentFile);
    if (linksArray) {
      resolve(linkProcessor(linksArray, arrayOfObjects, absolutePath));
    } else {
      reject('hubo un error') ;
    } 
  });
};

exports.mdLinks = mdLinks;
exports.tagsExtractor = tagsExtractor;
exports.linkProcessor = linkProcessor;
module.exports = exports;


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