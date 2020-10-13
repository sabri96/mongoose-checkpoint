console.log('express');
// 1- require express
const express = require('express');
//2- init express
const app = express();
const connectDB= require('./config/connectDB');
connectDB();

app.use(express.json());

app.use("/peaple", require("./routes/person"));

const port = 5000;
app.listen(port, (err) => {
  err ? console.log(err) : console.log('the server is running on port ...' , port);
});
