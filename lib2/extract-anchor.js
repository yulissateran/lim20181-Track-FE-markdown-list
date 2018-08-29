const marked = require('marked');

const matchInAnchors = (html) => {
  const result = html.match(/<a.*>(.*)<\/a>/gm);
  return result || [];
};
/* convierte el contenido markdown a html y retorna todos
las etiquetas <a> y su contenido en un array */

const extractAnchorLabels = (data) => {
  const html = marked(data);
  // console.log(html)
  const links = matchInAnchors(html);
  // console.log(links)
  return links;
};

exports.matchInAnchors = matchInAnchors;
exports.extractAnchorLabels = extractAnchorLabels;
// module.exports = exports;
