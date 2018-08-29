/* Toma el arreglo de anclas retorna: arreglo de objetos: {text, href, path} */
const convertLinksToObjects = (array, path, _linkAcum) => {
  _linkAcum = _linkAcum || [];
  if (array.length) {
    const head = array[0];
    const [, ...body] = array.length > 1 ? array : [];
    const text = ((/<a.*>(.*)<\/a>/g.exec(head))[1]);
    const href = head.match(/(http:\/\/|https:\/\/)[^\s"<]+/gi);
    // console.log(href.pop(), '_____________-href')
    _linkAcum.push({
      text,
      href: href ? href.pop() : '',
      path,
    });
    if (body.length >= 1) {
      convertLinksToObjects(body, path, _linkAcum);
    }
  }
  return _linkAcum;
};
// module.exports = convertLinksToObjects;
