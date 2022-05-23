const fsPromises = require('fs/promises');
const path = require('path');

(async () => {
  const filesArr = await fsPromises.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });

  for (let file of filesArr) {
    if (file.isFile()) {
      const fullFileName = file.name;
      const pathToFile = path.join(__dirname, 'secret-folder', fullFileName);
      
      const fileName = fullFileName.split('.')[0];
      const fileType = path.extname(pathToFile).substring(1);
      const stats = await fsPromises.stat(pathToFile);
      console.log(`\n${fileName} - ${fileType} - ${stats.size / 1024}kb`);
    }
  }
})();