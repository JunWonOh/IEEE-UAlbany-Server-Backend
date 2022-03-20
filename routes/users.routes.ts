export {};

const router = require('express').Router();
let User = require('../models/users.model');

router.route('/').post((req, res) => {
    User.findOne({ discord_id: req.body.id }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            User.find({discord_id: req.body.id}, function(err, currentUser) {
                if (currentUser.avatar != req.body.avatar) {
                    User.findOneAndUpdate({discord_id: req.body.id}, {$push: {avatar: req.body.avatar}, function(err, user) {
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
                discord_id: req.body.id,
                avatar: req.body.avatar,
                nickname: req.body.nickname,
                email: req.body.email,
                verifiedUser: false,
            });
            await newUser.save().catch((error) => {
                assert.isNotOk(error,'Promise error');
                done();
            });
            res.send("User has been logged");
        }
    })
})

router.route('/').get((req, res) => {
    User.find().sort({$natural: 1}).limit(5)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})
console.log("routes");
module.exports = router;