// const express = require("express");
// const http = require("http");
// const morgan = require("morgan");
// const bodyParser = require("body-parser");


// const app = express();
// const db = require('./models/index');

// app.use(express.json());
// app.use(morgan("dev"));
// app.use(bodyParser.json());
// app.use(express.static(__dirname + "/public"));
// app.use((req, res, next) => {
//   res.statusCode = 200;
//   res.setHeader("content-type", "text/html");
//   res.end("<thml><body><h1>This is an express server</h1></body></html>");
// });
// // app.use((req, res, next) => {
// //     res.setHeader('Access-Control-Allow-Origin', '*');
// //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
// //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// //     next();
// // });


// const port = process.env.PORT;
// if (port == null || port == "") {
//   port = 8080;
// }

// sequelize.sync()
//   .then(result => {
//     console.log(result);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// app.all("/items", (req, res, next) => {
//   res.statusCode = 200;
//   next();
// });

// app.get("/items", (req, res, next) => {
//   res.end("We will send all the items to you now!");
// });

// app.post("/items", (req, res, next) => {
//   res.end(
//     "I will add the items ",
//     +req.body.name + "with details " + req.body.description
//   );
// });

// app.put("/items", (req, res, next) => {
//   res.statusCode = 403; //not supported code
//   res.end("PUT opertions not supported on items ");
// });

// app.delete("/items", (req, res, next) => {
//   res.end("Deleting all the item to you now!");
// });

// app.get("/items/:itemId", (req, res, next) => {
//   res.end(
//     "We will send details of item " +
//       req.params.itemId +
//       " to you now!"
//   );
// });

// app.post("/items/:itemId", (req, res, next) => {
//   res.statusCode = 403; //not supported code
//   res.end("POST opertions not supported on items/ " + req.params.itemId);
// });

// app.put("/items/:itemId", (req, res, next) => {
//   res.write("we are updating the item: " + req.params.itemId, "\n");
//   res.end(
//     "We will update the item " +
//       req.body.name +
//       "  with details " +
//       req.body.description
//   );
// });

// app.delete("/items/:itemId", (req, res, next) => {
//   res.end("Deleting the item:" + req.params.itemId + " now!");
// });





const express = require("express")
const cors = require("cors")
const morgan = require("morgan");
const db =require('./models/db')


const app = express()
const PORT = 8080


app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// db.sync({force: true}).then(() => {
//     console.log("Database synced")
//     app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
// })

db.sync({force:true}).then(()=>{
  console.log('dataabse sync', )
  const server = http.createServer(app);
  server.listen(port, holstname, () => {
    console.log(`Server running at http://${holstname}:${port}`);
  });
})