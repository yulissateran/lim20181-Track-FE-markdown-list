const getLinksFileOrDirectory = require('./get-links.js');
const http = require('http');
const arrey = [
  {
    url: 'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/',
    text: 'Módulos(CommonJS)',
    pathFile: 'README.md',
  },
  {
    url: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    text: 'community laboratoria',
    pathFile: 'README.md',
  },
  {
    url: 'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
    text: 'community laboratoria',
    pathFile: 'README.md',
  }];
const request = (link) => {
 const response = new Promise((resolve)=>{
  http.get({
    hostname: 'www.google.com',
    path: '/',
    url:  link 
  }, (res) => {
    const statusText = `${res.statusMessage}  ${res.statusCode}`
   resolve(statusText); 
  });
 }); 
 return response;
};
const validate = (arrayLinks) => {
  const newArray = arrayLinks.map(async(objectLink) => {
    try {
      objectLink.validate = await request(objectLink.url);
      return objectLink;      
    } catch (err) {
      throw err;
    }
  });
  return newArray;
}
const iterable = validate(arrey); 
Promise.all(iterable)
.then((res) =>  console.log(res))
.catch((err)=>{ throw err});
const getValidateLinks = async(route) => {
  try{ 
      const links = await getLinksFileOrDirectory(route);
      const  iterable = await validate(links);
      const resolvedPromises = await Promise.all(iterable)
      .then((res) =>  console.log(res))
      return resolvedPromises;
  } catch(err){
    return err;
  }
  };
  module.exports = getValidateLinks;