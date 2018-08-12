const fs = require('fs');

fs.open('carpeta', 'r', (err, fd) => {
  if (err) throw err;
  fs.fstat(fd, (err, stat) => {
    if (err) throw err;
    // use stat
    if (stat.isDirectory()) {
      fs.readdir('carpeta', (err, files) => {
        if (err) console.log(err);
        files.forEach((file) => {
          console.log(file)
        }
        );

      });
    }
    // always close the file descriptor!
    fs.close(fd, (err) => {
      if (err) throw err;
    });
  });
});

