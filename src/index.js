const fs = require('fs');
fs.rename('./index.html', './main.html', (err) => {
  if (err) throw err;
  console.log('renamed complete');
});

fs.stat('./index.html', (err, stats) => {
  if (err) throw err;
  console.log(`stats: ${JSON.stringify(stats)}`);
});


