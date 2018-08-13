const fs = require('fs');
const path = require('path');

// console.log(path.normalize("https://www.youtube.com/watch?v=dtEVm5CaYiQ"));
// console.log('carpeta  ' + path.dirname('/foo/bar/baz/carpeta/index.html'));
// console.log('extension  ' + path.extname('index.html'));
// console.log('archivo + extención de archivo  ' + path.basename('/foo/bar/baz/asdf/quux.html'));
// console.log('archivo sin extensión  ' + path.basename('/foo/bar/baz/asdf/quux.html', '.html'));
// const objeto =path.parse('C:/Users/YulissaTerán/Documents/main.html');
// console.log('path.parse()  ', objeto);
const objeto2= { 
  root: 'C:/',
dir: 'C:/Users/YulissaTerán/Documents',
base: 'main.html',
ext: '.html',
name: 'main'
};
console.log(path.format(objeto2));
/* fs.open('carpeta', 'r', (err, fd) => {
  if (err) throw err;
  fs.fstat(fd, (err, stat) => {
    if (err) throw err;
    if (stat.isDirectory()) {
      fs.readdir('carpeta', (err, files) => {
        if (err) console.log(err);
        files.forEach((file) => {
          console.log(file);
        });
      });
    }
    fs.close(fd, (err) => {
      if (err) throw err;
    });
  });
});


fs.open('./main.html', 'r', (err, fd) => {
  if (err) throw err;
  console.log(fd);
  fs.fstat(fd, (err, stat) => {
    if (err) throw err;
    if (stat.isFile()) {
      fs.readFile('./main.html', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
      });
    }
    fs.close(fd, (err) => {
      if (err) throw err;
    });
  });
});
*/