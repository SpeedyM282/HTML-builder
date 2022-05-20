const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

function takeInput() {
  readline.question('Input smth: ', input => {
    if(input == 'exit') {
      console.log('Good Bye!');
      readline.close();
    } else {
      readline.on('SIGINT', function () {
        process.emit('SIGINT');
      });

      process.on('SIGINT', function () {
        console.log('\nGood Bye!');
        process.exit();
      });
      fs.appendFile('./text.txt', input + '\n', err => {
        if (err) {
          console.error(err);
        }
        takeInput();
      });
    }
  });
}

takeInput();