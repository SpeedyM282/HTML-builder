const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

const pathFromCopyFolder = path.join(__dirname, 'files');
const pathToCopyFolder = path.join(__dirname, 'files-copy');

fs.access(pathToCopyFolder, (error) => {
  if (error) {
    fsPromises.mkdir(pathToCopyFolder);
    console.log('files-copy directory is created!');
  } else {
    console.log('files-copy directory already exists!');
  }
});

async function copyDir(fromPath, toPath) {
  await fsPromises.rm(toPath, { force: true, recursive: true });
  await fsPromises.mkdir(toPath, { recursive: true });

  const filesArr = await fsPromises.readdir(fromPath, { withFileTypes: true });

  for (let file of filesArr) {
    const currentFilePath = path.join(fromPath, file.name);
    const copyFilePath = path.join(toPath, file.name);

    if (file.isDirectory()) {
      await fsPromises.mkdir(copyFilePath, { recursive: true });
      await copyDir(currentFilePath, copyFilePath);
    } else if (file.isFile()) {
      await fsPromises.copyFile(currentFilePath, copyFilePath);
    }
  }
}

copyDir(pathFromCopyFolder, pathToCopyFolder);