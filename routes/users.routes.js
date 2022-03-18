var router = require('express').Router();
var User_model = require('../models/users.model');
router.route('/').get(function (req, res) {
    console.log('hello!!');
    res.send('hi!');
});
module.exports = router;
