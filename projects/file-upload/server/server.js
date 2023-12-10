const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(fileUpload({uploadTimeout: 0}));
app.use(express.static(path.resolve(__dirname, 'static')));

async function writeFile(files) {
  return files.map( async (file) => {
      const mimetype = file.mimetype.split("/")[0];
      console.log(mimetype);
      const extention = mimetype === 'audio' ? '.mp3': '.jpg';
      const fileName = Date.now() + extention;
      const filePath = path.resolve(__dirname, '.', 'static', mimetype);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true});
      }

      await file.mv(path.resolve(filePath, fileName));

      return {fileName, mimetype};
  })
}

app.post('/upload', async (request, response) => {
  try {
    const serverResponse = {};
    const { author } = request.body;
    const fls = Object.values(request.files);

    const result = await writeFile(fls);
    const resPromise = await Promise.all(result);
    resPromise.forEach(({fileName,  mimetype}) => {
      serverResponse[mimetype] = fileName;
    });
    response.status(200).json({...serverResponse, author });
  } catch (err) {
    response.status(400).json({error: 'Error'});
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});