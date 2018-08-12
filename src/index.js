const fs = require('fs');

// fs.open('carpeta', 'r', (err, fd) => {
//   if (err) throw err;
//   fs.fstat(fd, (err, stat) => {
//     if (err) throw err;
//     if (stat.isDirectory()) {
//       fs.readdir('carpeta', (err, files) => {
//         if (err) console.log(err);
//         files.forEach((file) => {
//           console.log(file)
//         });
//       });
//     }
//     fs.close(fd, (err) => {
//       if (err) throw err;
//     });
//   });
// });
// fs.open('carpeta', 'r', (err, fd) => {
//   if (err) throw err;
//   fs.fstat(fd, (err, stat) => {
//     if (err) throw err;
//     if (stat.isDirectory()) {
//       fs.readdir('carpeta', (err, files) => {
//         if (err) console.log(err);
//         files.forEach((file) => {
//           console.log(file)
//         });
//       });
//     }
//     fs.close(fd, (err) => {
//       if (err) throw err;
//     });
//   });
// });

fs.open('./main.html', 'r', (err, fd) => {
  if (err) throw err;
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


