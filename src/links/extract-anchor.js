const marked = require('marked');

/* convierte el contenido markdown a html y retorna todos
las etiquetas <a> y su contenido en un array */

const extractAnchorLabels = (data) => {
  return marked(data).match(/<a.*>(.*)<\/a>/g);
};
module.exports = extractAnchorLabels;
