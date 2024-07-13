const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cors = require('cors')
const express = require('express')


 


app.use(express.json());
app.use(cors())
  

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}; 

app.use(cors(corsOptions));
  

app.use(express.static('back-end')); 
app.use('/uploads/billImages', express.static('uploads/billImages'))  


// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to uuncaught Exception `);
  process.exit(1);
});

// env file connection
dotenv.config({ path: "config/config.env" });

app.get("/", (req, res) => {
  res.send("home page bulid nodeJs api...");
});

connectDatabase();

// run server port number 3000
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