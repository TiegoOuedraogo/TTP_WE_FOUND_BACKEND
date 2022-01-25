const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const holstname = "localhost";
const port = 8080;

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());

app.all("/items", (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("content-type", "text/plain");
  next();
});

app.get("/items", (req, res, next) => {
  res.end("We will send all the items to you now!");
});

app.post("/items", (req, res, next) => {
  res.end(
    "I will add the items ",
    +req.body.name + "with details " + req.body.description
  );
});

app.put("/items", (req, res, next) => {
  res.statusCode = 403; //not supported code
  res.end("PUT opertions not supported on items ");
});

app.delete("/items", (req, res, next) => {
  res.end("Deleting all the item to you now!");
});

app.get("/items/:itemId", (req, res, next) => {
  res.end(
    "We will send details of item " +
      req.params.itemId +
      " to you now!"
  );
});

app.post("/items/:itemId", (req, res, next) => {
  res.statusCode = 403; //not supported code
  res.end("POST opertions not supported on items/ " + req.params.itemId);
});

app.put("/items/:itemId", (req, res, next) => {
  res.write("we are updating the item: " + req.params.itemId, "\n");
  res.end(
    "We will update the item " +
      req.body.name +
      "  with details " +
      req.body.description
  );
});

app.delete("/items/:itemId", (req, res, next) => {
  res.end("Deleting the item:" + req.params.itemId + " now!");
});
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("content-type", "text/html");
  res.end("<thml><body><h1>This is an express server</h1></body></html>");
});

const server = http.createServer(app);
server.listen(port, holstname, () => {
  console.log(`Server running at http://${holstname}:${port}`);
});