const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/save-data', (req, res) => {
  const data = req.body;
  fs.readFile('database.json', (err, fileData) => {
    if (err) {
      const jsonData = [];
      jsonData.push(data);
      fs.writeFile('database.json', JSON.stringify(jsonData), (err) => {
        if (err) {
          console.error(err);
        } else {
          res.send('تم الحفظ بنجاح!');
        }
      });
    } else {
      const jsonData = JSON.parse(fileData);
      jsonData.push(data);
      fs.writeFile('database.json', JSON.stringify(jsonData), (err) => {
        if (err) {
          console.error(err);
        } else {
          res.send('تم الحفظ بنجاح!');
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});