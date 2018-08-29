const myReadFile  = require('./read-file');
/* toma el arreglo de rutas y retorna un arreglo de objetos 
con propiedad href, text y path */
const myReadDir = async ([head, ...body], _linksFiles) => {
  try{
    _linksFiles = _linksFiles || [];
    _linksFiles = _linksFiles.concat(await myReadFile(head));
    if (body.length !== 0){
      return myReadDir(body, _linksFiles);
    } 
    return _linksFiles;
  }catch (err) {
    throw err;
  }
};
// module.exports = myReadDir;

// const arrroutes = [ 'carpeta/mini-carpeta/README.md',
// 'carpeta/mini-carpeta/READMA.md' ];
// myReadDir(arrroutes)
// .then((response)=>{ 
// }).catch((err)=>{
// })