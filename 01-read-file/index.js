const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.join(__dirname, 'text.txt'));

let data = '';
rs.on('data', content => data += content);
rs.on('end', () => console.log(data));
rs.on('error', err => console.log('Error: ', err.message));