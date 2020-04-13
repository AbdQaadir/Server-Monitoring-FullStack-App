const express = require("express");
const path = require("path");
const bP = require("body-parser");
const Joi = require("joi");

// init app
const app = express();

// Body parser json
app.use(bP.json());

// Getting response from a Server
app.get("/", (req, res) => {
  res.status(200).send({
    Status: "Success",
  });
});

// Posting

let myData = "Great to have you";

app.post("/data", (req, res) => {
  myData = req.body;
  res.json(myData);
});

// Getting back the response
app.get("/data", (req, res) => {
  res.json(myData);
});

// Assigning the port using Environment Variable PORT(for server) or declare it locally
const port = process.env.PORT || 3000;
// Start Server
app.listen(port, () => console.log(`Listening on port ${port}....`));
