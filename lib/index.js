const fs = require('fs');
const marked = require('marked');
const path = require('path');
const dir = require('node-dir');
const request = require('request');

/* realiza peticiones http/https  a cada link y retorna OK 200 - Not Found 404, etc*/
const requestToLink = link => new Promise((resolve, reject) => request.get(link)
  .on('response', response => resolve(`${response.statusMessage} ${response.statusCode}`))
  .on('error', err=> reject(err.message) ).end());

/* Agrega la respuesta del servidor a la prop status */
const linkValidation = (arrayLinks) => 
  arrayLinks.map(async (objectLink) => {
    objectLink.status = objectLink.href ? await requestToLink(objectLink.href) : 'Not Found Link'
    return objectLink;
  });

/* devuelve la ruta convertida en absoluta si era relativa */
const converterPathToAbsolute = route => path.isAbsolute(route) ? route : path.join(process.cwd(), route);
  
/* Identifica si la ruta es de un archivo o directorio */
const identifyFileOrDirectory = route => new Promise((resolve, reject) =>
    fs.stat(route, (err, stats) => err ? reject(err) : resolve(stats.isDirectory() ? 'directory' : 'file')));

/* extrae los links de sus objetos  */
const getLinksOfObjects = array => array.map(element => element.href);

/* extrae links únicos */
const getLinksUniques = array => array.filter((element, index, arr) => arr.indexOf(element) === index);

/* extrae todos los archivos de un directorio */
const getFilesDirectory = directory => new Promise((resolve, reject) =>
  dir.files(directory, (err, files) => err ? reject(err) : resolve(files)));

 /* extrae archivos markdown */
const getFilesMd = files =>  files.filter(file => path.extname(file) === '.md'); 

/* obtiene contenido de un archivo */
const getFileContent = route => new Promise((resolve, reject) =>
  fs.readFile(route, 'utf8', (err, data) => err ? reject(err) : resolve(data)));

/* convierte markdown a html y retorna las etiquetas <a></a> y su contenido en un array */
const extractAnchorLabels = data => marked(data).match(/<a.*>(.*)<\/a>/gm) || [];

/* Toma el arreglo de anclas retorna: arreglo de objetos: {text, href, path} */
const convertLinksToObjects = (array, path, _linkAcum) => {
  _linkAcum = _linkAcum || [];
  if (array.length) {
    const head = array[0];
    const [, ...body] = array.length > 1 ? array : [];
    const text = ((/<a.*>(.*)<\/a>/g.exec(head))[1]);
    const href = head.match(/(http:\/\/|https:\/\/)[^\s"<]+/gi);
    _linkAcum.push({
      text: text.slice(0, 51),
      href: href ? href.pop() : '',
      path,
    });
    if (body.length >= 1) convertLinksToObjects(body, path, _linkAcum);
  }
  return _linkAcum;
};

/* se ejecuta si la ruta es de un archivo */
const myReadFile = async (path) => {
  const contentFile = await getFileContent(path);
  const anchorLabelsArray = await extractAnchorLabels(contentFile);
  const objectLinksArray = await convertLinksToObjects(anchorLabelsArray, path);
  return objectLinksArray;
};

/* se ejecuta si la ruta es un directorio */
const myReadDir = async ([head, ...body], _linksFiles) => {
  _linksFiles = _linksFiles || [];
  _linksFiles = _linksFiles.concat(await myReadFile(head));
  if (body.length !== 0) return myReadDir(body, _linksFiles);
  return _linksFiles;
};

/* Obtiene un array de un objeto por cada link que encuentre en la ruta dada, ya sea archivo o directorio */
const getLinksFileOrDirectory = async (route) => {
  const absoluteRoute = await converterPathToAbsolute(route);
  const routeIs = await identifyFileOrDirectory(absoluteRoute);
  if (routeIs === 'directory') {
    const files = await getFilesDirectory(absoluteRoute);
    const filesMd = await getFilesMd(files);
    const linksDir = await myReadDir(filesMd);
    return linksDir;
  } else {
    const linksFile = await myReadFile(absoluteRoute)
    return linksFile;
  }
};

/* Se ejecuta si stats es true */
const getStatusLinks = async (route) => {
  const objectslinks = await getLinksFileOrDirectory(route);
  const arrayLinksOnly = await getLinksOfObjects(objectslinks);
  const uniqueLinks = getLinksUniques(arrayLinksOnly);
  return [{total: arrayLinksOnly.length ,unique: uniqueLinks.length}];
};

/* Se ejecuta si validate es true */  
const getValidateLinks = async (route) => {
  const links = await getLinksFileOrDirectory(route);
  const linksWithValidation = await linkValidation(links);
  const resolvedPromises = await Promise.all(linksWithValidation);
  return resolvedPromises;
};

/* Se ejecuta si stats y validate son true */
const validateAndStateLinks = async (route) => {
  const statusLinks = await getStatusLinks(route);
  const linkValidations = await getValidateLinks(route);
  const brokenLinks = linkValidations.filter((element) => element.status === 'Not Found 404');
  const validateAndState = [{total: statusLinks[0].total ,unique: statusLinks[0].unique, broken: brokenLinks.length}];
  return validateAndState;

};

/* Evalua los argumentos aplica condicionales y llama a la función respectiva */
const mdLinks = async (path, options) => {
  const { validate, stats } = options|| { validate: null, stats:null };
  let result = '';
  try{
    if (path && !validate && !stats) result = await getLinksFileOrDirectory(path);
    else if (path && validate && !stats) result = await getValidateLinks(path);
    else if (path && !validate && stats) result = await getStatusLinks(path);
    else if (path && validate && stats) result = validateAndStateLinks(path);
    return result;
  } catch(err){
  throw  err;
  }
};

module.exports = mdLinks;
