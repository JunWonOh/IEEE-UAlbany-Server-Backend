export {};

const router = require('express').Router();
let User = require('../models/users.model');

router.route('/').post((req, res) => {
    if (process.env.ACCESSKEY === req.body.accesskey) {
        User.findOne({ discord_id: req.body.id }, async (err, doc) => {
            if (err) throw err;
            if (doc) {
                //update discord avatar or name if it changed
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
                    if (currentUser.nickname != req.body.nickname) {
                        User.findOneAndUpdate({discord_id: req.body.id}, {$push: {nickname: req.body.nickname}, function(err, user) {
                            if (!err) {
                                res.send("User has already been logged. Username is new so it has been updated.");
                            } else {
                                res.send(err);
                            }
                        }})
                    }
                })
                res.send("User has already been logged. No changes were found.");
            }
            // if user is new, add them to the db
            if (!doc) {
                const newUser = new User({
                    discord_id: req.body.id,
                    avatar: req.body.avatar,
                    nickname: req.body.nickname,
                    email: req.body.email,
                    verifiedUser: false,
                });
                try {
                    await newUser.save();
                } catch(err) {
                    console.error(err);
                }
                res.send("User has been logged");
            }
        })
    } else {
        res.send("You don't have access to POST to this collection")
    }
})

router.route('/recentmembers').get((req, res) => {
    //get last 5 users in descending order
    console.log(req.query)
    if (process.env.ACCESSKEY === req.query.accesskey) {
        User.find().sort({$natural: 1}).limit(5)
            .then(users => res.json(users))
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.send("Invalid Access Key");
    }
})

router.route('/').get((req, res) => {
    //get all users in ascending order
    if (process.env.ACCESSKEY === req.query.accesskey) {
        User.find().sort({$natural: -1})
            .then(users => res.json(users))
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.send("Invalid Access Key");
    }
})
module.exports = router;