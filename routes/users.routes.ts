// export {};

const router = require('express').Router();
let User_model = require('../models/users.model');

router.route('/loguser').post((req, res) => {
    User_model.findOne({ id: req.body.id }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            User.find({id: req.body.id}, function(err, currentUser) {
                if (currentUser.avatar != req.body.avatar) {
                    User.findOneAndUpdate({id: req.body.id}, {$push: {avatar: req.body.avatar}, function(err, user) {
                        if (!err) {
                            res.send("User has already been logged. Avatar is new so it has been updated.");
                        } else {
                            res.send(err);
                        }
                    }})
                }
            })
            res.send("User has already been logged. No changes were found.");
        }
        if (!doc) {
            const newUser = new User({
                id: req.body.id,
                avatar: req.body.avatar,
                nickname: req.body.nickname,
                email: req.body.email,
                verifiedUser: false,
            });
            await newUser.save();
            res.send("User has been logged");
        }
    })
})

router.route('/lastfiveusers').get((req, res) => {
    User.find().sort({$natural: 1}).limit(5)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;