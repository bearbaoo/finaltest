const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5173;
const DATA_FILE = path.join(__dirname, "Data.json");

app.use(bodyParser.json());

app.post("/add-task", (req, res) => {
  const newTask = req.body;

  fs.readFile(DATA_FILE, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading data file" });
    }

    let tasks = [];
    try {
      tasks = JSON.parse(data);
    } catch (error) {
      return res.status(500).json({ message: "Error parsing data file" });
    }

    tasks.push(newTask);

    fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing to data file" });
      }
      res.status(200).json({ message: "Task added successfully" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});