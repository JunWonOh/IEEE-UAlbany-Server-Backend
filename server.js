require('dotenv').config();
// Importing module
var express = require('express');
var cors = require('cors');
var _a = require('express-openid-connect'), auth = _a.auth, requiresAuth = _a.requiresAuth;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var app = express();
var PORT = 3000;
app.use(cors());
app.use(express.json());
var uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
var connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
});
var usersRouter = require('./routes/users.routes');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("frontend/build"))
app.use('/users', usersRouter);
app.use(auth({
    //authRequired: every route does not need authentication
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET
}));
app.get('/login', function (req, res) {
    console.log('logging in.......');
    res.send("Logging in");
});
// Handling GET / Request
// app.get('/', function(req, res) {
//     console.log(JSON.stringify(req.oidc.user));
//     res.send(req.oidc.user);
// })
// Server setup
app.listen(process.env.PORT || PORT, function () {
    console.log('The application is listening '
        + 'on port http://localhost:' + PORT);
});
