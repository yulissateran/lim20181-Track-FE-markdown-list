const mdLinks = require('./index');
mdLinks('test/',{ validate: true, stats: true }).then((res)=>{
  console.log(res);
}).catch(()=>{})