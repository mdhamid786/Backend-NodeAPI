const app = require("./app");
const dotenv = require("dotenv");
const express = require('express');
const connectDatabase = require("./config/database");
app.use(express.json());
const cors = require('cors')

// env file connection
dotenv.config({ path: "config/config.env" });

// database connection
connectDatabase();
// run server port number 3000
app.use(cors())


  

app.get('/', (req, res) => {
 
  res.send("server is working ...");
});


const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on port http://localhost:${process.env.PORT}`);
});

// unhandle promise rejection...

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to unhandle promise rejection `);

  server.close(() => {
    process.exit(1);
  });
});