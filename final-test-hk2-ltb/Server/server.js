const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/addTask', (req, res) => {
  const task = req.body;
  
  fs.readFile('tasks.json', (err, data) => {
    let tasks = [];
    if (!err && data.length > 0) {
      tasks = JSON.parse(data);
    }
    tasks.push(task);
    fs.writeFile('tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        res.status(500).send('Could not save task');
      } else {
        res.status(200).send('Task saved');
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
