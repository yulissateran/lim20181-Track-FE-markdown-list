const path = require('path');

const converterPathToAbsolute = (Path) =>{
  const absolutePath = path.isAbsolute(Path) ? Path : path.resolve(Path);
  return absolutePath;
};
module.exports = converterPathToAbsolute;
