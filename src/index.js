import getLinksFileOrDirectory from './get-links';

const mdLinks = (path, options) => {
  const route = path || __dirname;
  const { validate, state } = options;
  if (path && !validate && !state) {
    getLinksFileOrDirectory(route);
  } else if (path && validate && !state) {
    
  } else if (path && !validate && state) {
  }
};
// import modulo from './hola.jsx'
export default mdLinks;
