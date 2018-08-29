const path = require('path');

const converterPathToAbsolute = (Path) => {
  const absolutePath = path.isAbsolute(Path) ? Path : path.join(process.cwd(), Path);
  return absolutePath;
};
// module.exports = converterPathToAbsolute;
