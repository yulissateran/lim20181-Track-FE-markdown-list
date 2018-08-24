/* Toma el arreglo de anclas retorna: arreglo de objetos: {text, href, path} */
const convertLinksToObjects = ([head, ...body], path, _linkAcum) => {
  // eslint-disable-next-line
  _linkAcum = _linkAcum || [];
  const text = ((/<a.*>(.*)<\/a>/g.exec(head))[1]);
  const href = head.match(/(http:\/\/|https:\/\/|www\.|ftp:\/\/)[^\s"]+/gi);
  _linkAcum.push({
    text,
    href: href.pop(),
    path,
  });
  if (body.length > 0) {
    convertLinksToObjects(body, path, _linkAcum);
  }
  return _linkAcum;
};
export default convertLinksToObjects;
