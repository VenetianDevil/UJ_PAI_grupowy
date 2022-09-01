#!/usr/bin/node
'use strict';

const express = require('express');
const db = require('./config/database');
const cors = require('cors')
const path = require("path");
const fs = require('fs');

const app = express();

let PORT = 3002;

db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(() => console.log("Error: ", err))

app.use(cors())

app.use('/api/auth', require('./controllers/loginRegisterController'));
app.use('/api/offers', require('./controllers/offersRoutes'));
app.use('/api/recruitments', require('./controllers/recruitmentsRoutes'));
app.use('/api/users', require('./controllers/userRoutes'));
app.use('/api/companies', require('./controllers/CompanyProfileRoutes'));


const jwtService = require("./services/jwtService");
const { fstat } = require('fs');

app.get('/api/hello', jwtService.verifyToken, (req, res)=>{
    let response = `
Hello, ${req.user_login}!
Your id is: ${req.user_id}.
`
    res.status(200).send(response);
})

// serwowanie static frontendu
if(fs.existsSync(path.join(__dirname, "..", "build"))){
  app.use(express.static(path.join(__dirname, "..", "build")))
    .use((req, res, next) => {
      res.sendFile(path.join(__dirname, "..", "build", "index.html"));
    });
}

app.listen(PORT, () => {
  console.log('Exam app listening on port ' + PORT + ' !');
});