#!/usr/bin/node
'use strict';

const express = require('express');
const db = require('./config/database');
const cors = require('cors')
const path = require("path");

const app = express();

let PORT = 3002;

db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(() => console.log("Error: ", err))

app.use(cors())

app.use('/api/auth', require('./controllers/loginRegisterController'));


const jwtService = require("./services/jwtService");

app.get('/api/hello', jwtService.verifyToken, (req, res)=>{
    let response = `
Hello, ${req.user_login}!
Your id is: ${req.user_id}.
`
    res.status(200).send(response);
})

// serwowanie static frontendu
/*app.use(express.static(path.join(__dirname, "..", "build")))
  .use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  });*/

app.listen(PORT, () => {
  console.log('Exam app listening on port ' + PORT + ' !');
});