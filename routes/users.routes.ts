const router = require('express').Router();
let User_model = require('../models/users.model');

router.route('/').get((req, res) => {
    console.log('hello!!')
    res.send('hi!');
})

module.exports = router;