const fs = require('fs');

fs.watch('./main.html', { encoding: 'utf8' }, (eventType, filename) => {
  console.log( eventType);
  if (filename) {
    
    // Prints: <Buffer ...>
  }
});