import * as http from 'http'
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
  const array = [
      'https://carlosazaustre.com/manejando-la-asincronia-en-javascript/',
      'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175',
      'http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175'
    ];
// const filterUnics = (array)=>{
//  return array.filter((element, índice)=>{ element.url !== element[índice + 1 || índice - 1].url })
// };
// console.log(filterUnics(arrey))

// newArray = array.map((element)=>element.url);
// const unicos = (element, index, arr) =>{ 
//    return arr.indexOf(element) === index;
// };
// console.log(array.filter(unicos));





// const state =(array) =>{
// const mapear = array.map((elemMap,indexMap)=>{
//   const cadauno = array.some((elemSome,indexSome)=>elemSome.url === elemMap.url && indexMap != indexSome);
//   return cadauno;
// })
//  return mapear;
// }
// const state2 =(arrey)=>{
//   const indices = [{true: 0, false: 0}]
//   const stadisticas = state(arrey);
//   stadisticas.forEach((elem,i)=>{
//   elem? indices[0].true = indices[0].true + 1 : indices[0].false = indices[0].false +1; 
//   }
// );
// return indices
// };





// console.log(state2(arrey))

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
Promise.all(iterable).then((res) => {
  console.log(res)
}).catch((err)=>{ throw err});