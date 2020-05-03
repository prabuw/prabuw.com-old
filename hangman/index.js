const fs = require('fs');
const os = require('os');

function buildWordsForHangman() {
  fs.readFile('./hangman/words_alpha.txt', 'utf8', (readErr, data) => {
    if (readErr) throw readErr;

    const words = data
      .split(os.EOL)
      .map(word => word.replace('\r', ''))
      .filter(word => word.length > 2);

    fs.writeFile('./static/words.json', JSON.stringify(words), writeErr => {
      if (writeErr) throw writeErr;
    });
  });
}

module.exports = buildWordsForHangman;
