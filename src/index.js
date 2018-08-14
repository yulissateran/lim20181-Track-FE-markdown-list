// const fs = require('fs');
// const path = require('path');
const http = require('http');
// const server = http.createServer((req, res)=>{
// if(req.url === '/src/view/main.html'){
//   console.log(res);
//   // res.write('Hello World');
//   res.end();
// }
// });
// server.listen(8887);
// console.log('Listener on port 3000..');
http.get('http://127.0.0.1:8887/src/view/main.html', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];
 console.log(statusCode);
  let error;
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } 
  // else if (!/^application\/json/.test(contentType)) {
  //   error = new Error('Invalid content-type.\n' +
  //                     `Expected application/json but received ${contentType}`);
  // }
  if (error) {
    console.error(error.message);
    // consume response data to free up memory
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { 
    // console.log(chunk);
    rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = (rawData).toString();
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});