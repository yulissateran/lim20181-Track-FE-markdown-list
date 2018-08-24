import path from 'path';

const converterPathToAbsolute = (Path) =>{
  const absolutePath = path.isAbsolute(Path) ? Path : path.resolve(Path);
  return absolutePath;
};
exports.converterPathToAbsolute = converterPathToAbsolute;

module.exports;
