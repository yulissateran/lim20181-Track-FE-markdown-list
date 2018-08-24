/* toma el arreglo de rutas retorna todos los que sean .md */
const getFilesMd = ([head, ...body], _filesMd) => {
  // eslint-disable-next-line
  _filesMd = _filesMd || [];
  // eslint-disable-next-line
  head.match(/.md$/) ? _filesMd.push(head) : _filesMd;
  if (body.length > 0) {
    getFilesMd(body, _filesMd);
  }
  return _filesMd;
};
export default getFilesMd;
