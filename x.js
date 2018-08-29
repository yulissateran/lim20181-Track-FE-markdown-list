const mdLinks = require('./index');
mdLinks('test/',{ validate: true }
).then((res)=>{
  console.log(res)
}).catch(()=>{})