const fs = require('fs');
const marked = require('marked');
const path = require('path');
const dir = require('node-dir');
const request = require('request');

const requestToLink = (link) => {
  return new Promise((resolve, reject) => {
    request.get(link)
      .on('response', (response) => resolve(`${response.statusMessage} ${response.statusCode}`))
      .on('error', (err) => reject(err.message));
  });
};

/* se ejecuta si la ruta es de un archivo */
const myReadFile = async (path) => {
  try {
    const contentFile = await getFileContent(path);
    const anchorLabelsArray = await extractAnchorLabels(contentFile);
    const objectLinksArray = await convertLinksToObjects(anchorLabelsArray, path);
    return objectLinksArray;
  } catch (err) {
    return err
  }
};

const myReadDir = async ([head, ...body], _linksFiles) => {
  try {
    _linksFiles = _linksFiles || [];
    _linksFiles = _linksFiles.concat(await myReadFile(head));
    if (body.length !== 0) {
      return myReadDir(body, _linksFiles);
    }
    return _linksFiles;
  } catch (err) {
    return err;
  }
};


const linkValidation = (arrayLinks) => {
  const newArray = arrayLinks.map(async (objectLink) => {
    try {
      objectLink.state = objectLink.href ? await requestToLink(objectLink.href) : 'Not Found 404';
      return objectLink;
    } catch (err) {
      throw err;
    }
  });
  return newArray;
};

/* Identifica si la ruta es de un archivo o directorio */
const identifyFileOrDirectory = (route) => new Promise((resolve, reject) =>
  fs.stat(route, (err, stats) => err ? reject(err) : resolve(stats.isDirectory() ? 'directory' : 'file')));


const getValidateLinks = async (route) => {
  try {
    const links = await getLinksFileOrDirectory(route);
    const linksWithValidation = await linkValidation(links);
    const resolvedPromises = await Promise.all(linksWithValidation);
    return resolvedPromises;
  } catch (err) {
    return err;
  }
};

const getLinksOfObjects = (array) => {
  return array.map(element => element.href);
};

const getLinksUniques = (array) => {
  return array.filter((element, index, arr) => arr.indexOf(element) === index);
};


const getStatusLinks = async (route) => {
  try {
    const objectslinks = await getLinksFileOrDirectory(route);
    const arrayLinksOnly = await getLinksOfObjects(objectslinks);
    const uniqueLinks = getLinksUniques(arrayLinksOnly);
    return [{total: arrayLinksOnly.length ,unique: uniqueLinks.length}];
  } catch (err) {
    return err;
  }
};


const getLinksFileOrDirectory = async (route) => {
  try {
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
  } catch (err) {
    throw err;
  }
};


const getFilesMd = (files) =>  files.filter(file => path.extname(file) === '.md');


const getFilesDirectory = directory => new Promise((resolve, reject) => {
  dir.files(directory, (err, files) => (err ? reject(err) : resolve(files)));
});


// obtiene contenido de un archivo
const getFileContent = (route) => new Promise((resolve, reject) => {
  fs.readFile(route, 'utf8', (err, data) => err ? reject(err) : resolve(data));
});


/* convierte markdown a html y retorna las etiquetas <a></a> y su contenido en un array */
const extractAnchorLabels = (data) => marked(data).match(/<a.*>(.*)<\/a>/gm) || [];


/* devuelve la ruta convertida en absoluta si era relativa */
const converterPathToAbsolute = route => path.isAbsolute(route) ? route : path.join(process.cwd(), route);



/* Toma el arreglo de anclas retorna: arreglo de objetos: {text, href, path} */
const convertLinksToObjects = (array, path, _linkAcum) => {
  _linkAcum = _linkAcum || [];
  if (array.length) {
    const head = array[0];
    const [, ...body] = array.length > 1 ? array : [];
    const text = ((/<a.*>(.*)<\/a>/g.exec(head))[1]);
    const href = head.match(/(http:\/\/|https:\/\/)[^\s"<]+/gi);
    _linkAcum.push({
      text,
      href: href ? href.pop() : '',
      path,
    });
    if (body.length >= 1) convertLinksToObjects(body, path, _linkAcum);
  }
  return _linkAcum;
};


const validateAndStateLinks = async (route) => {
  try {
    const statusLinks = await getStatusLinks(route);
    const linkValidations = await getValidateLinks(route);
    const brokenLinks = linkValidations.filter((element) => element.state !== 'OK 200');
    const validateAndState = [{total:statusLinks[0].total ,unique:statusLinks[0].unique, broken:brokenLinks.length}];
    return validateAndState;
  } catch (err) {
    return err;
  }
};


const mdLinks = async (path, options) => {
  const { validate, stats } = options|| { validate: null, stats:null };
  let result = '';
  try{
    if (path && !validate && !stats) {
      result = await getLinksFileOrDirectory(path);
    } else if (path && validate && !stats) {
      result = await getValidateLinks(path);
    } else if (path && !validate && stats) {
      result = await getStatusLinks(path);
    } else if (path && validate && stats) {
      result = validateAndStateLinks(path)
    }
    return result;
  } catch(err){
  throw  err;
  }

};

module.exports = mdLinks;
