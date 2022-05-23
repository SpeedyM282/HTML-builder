const fsPromises = require('fs/promises');
const path = require('path');

const pathToFile = path.join(__dirname, 'project-dist', 'bundle.css');
const pathFromFolder = path.join(__dirname, 'styles');
let arrOfStyles = [];

(async () => {
  const filesArr = await fsPromises.readdir(pathFromFolder, { withFileTypes: true });

  for (let file of filesArr) {
    const pathToCurrentFile = path.join(pathFromFolder, file.name);
    const fileType = path.extname(pathToCurrentFile);

    if (fileType === '.css') {
      const cssContent = await fsPromises.readFile(pathToCurrentFile, 'utf8');
      arrOfStyles.push(`${cssContent}\n`);
    }
  }

  await fsPromises.writeFile(pathToFile, arrOfStyles);
})();