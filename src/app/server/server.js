const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3008;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const jsonData = "./heroes-data.json";

// Endpoint para obtener los héroes
app.get("/heroes", (req, res) => {
  fs.readFile(jsonData, "utf8", (err, data) => {
    if (err) {
      console.error("Error to read json:", err);
      res.status(500).send("Server errror");
      return;
    }
    const heroes = JSON.parse(data);
    res.json(heroes);
  });
});

// Endpoint para guardar los héroes
app.post("/save-heroes", (req, res) => {
  const heroes = req.body;
  const jsonContent = JSON.stringify(heroes, null, 2);

  fs.writeFile(jsonData, jsonContent, (err) => {
    if (err) {
      res.status(500).send("Server Error");
      return;
    }
    res.json(jsonData);
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`server listening on: http://localhost:${port}`);
});
