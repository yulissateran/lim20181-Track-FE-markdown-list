const fs = require('fs');

// fs.open('../README.md', 'r', (err, fd) => {
//   if (err) throw err;
//   fs.fstat(fd, (err, stat) => {
//     if (err) throw err;
//     // use stat
//     console.log(stat);
//     console.log(stat.isFile());
//     console.log(stat.isDirectory());
//     // always close the file descriptor!
//     fs.close(fd, (err) => {
//       if (err) throw err;
//     });
//   });

// });

// destination.txt will be created or overwritten by default.
fs.copyFile('./main.html', './index.html', (err) => {
  if (err) throw err;
  console.log('source.txt was copied to destination.txt');
});