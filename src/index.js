
const https = require('https');

https.get('https://encrypted.google.com/', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    // console.log(d.toString());
  });
}).on('error', (e) => {
  console.error(e);
});