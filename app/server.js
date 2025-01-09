const express = require("express");
require("dotenv").config();

const router = require("./routes/index");

const app=express();


app.use(express.json());
app.use(router);


const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.listen(PORT,()=>console.log(`http://${HOST}:${PORT}`))