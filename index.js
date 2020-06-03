const express = require("express");

// Imports
const infoRouter = require("./Blog/info");

// server
const server = express();

// ROUTERS
server.use(express.json());
server.use("/api/posts", infoRouter);

// Testing server
server.get("/", (req, res) => {
  res.send(`<h1>This is from your server</h1>`);
});

const port = 5000;
server.listen(port, () => {
  console.log(`\n Server is listening on port ${port} \n`);
});
