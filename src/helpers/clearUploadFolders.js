const fs = require('fs');
const path = require('path');

exports.clearUploadFolders = () => {
  const uploadsPath = path.join(__dirname, '../../uploads');
  fs.readdir(uploadsPath, (err, files) => {
    if (err) {
      console.error(`Error list files ${uploadsPath}: ${err}`);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(uploadsPath, file);
      fs.unlink(filePath, err => {
        if (err) {
          console.error(`Erro remove files ${filePath}: ${err}`);
        }
      });
    });
  });
}