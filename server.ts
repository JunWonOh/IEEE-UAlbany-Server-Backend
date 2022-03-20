require('dotenv').config();

// Importing module
const express = require('express');
const cors = require('cors');
const { auth, requiresAuth } = require('express-openid-connect');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const path = require('path');
// import express from "express";
// import cors from "cors";
// import { auth, requiresAuth } from "express-openid-connect";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import path from "path";
const app = express();
const PORT:Number = 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users.routes');
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("frontend/build"))
app.use('/users', usersRouter);


app.use(
    auth({
        //authRequired: every route does not need authentication
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET
    })
);

app.get('/login', function(req, res) {
    console.log('logging in.......');
    res.send("Logging in");
})

// Handling GET / Request
// app.get('/', function(req, res) {
//     console.log(JSON.stringify(req.oidc.user));
//     res.send(req.oidc.user);
// })

// Server setup
app.listen(process.env.PORT || PORT,() => {
    console.log('The application is listening '
          + 'on port http://localhost:'+PORT);
})