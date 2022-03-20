"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from "express";
// const router = express.Router();
// import User from "../models/users.model";
const router = require('express').Router();
let User = require('../models/users.model');
router.route('/').post((req, res) => {
    User.findOne({ discord_id: req.body.id }, (err, doc) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            throw err;
        if (doc) {
            User.find({ discord_id: req.body.id }, function (err, currentUser) {
                if (currentUser.avatar != req.body.avatar) {
                    User.findOneAndUpdate({ discord_id: req.body.id }, { $push: { avatar: req.body.avatar }, function(err, user) {
                            if (!err) {
                                res.send("User has already been logged. Avatar is new so it has been updated.");
                            }
                            else {
                                res.send(err);
                            }
                        } });
                }
            });
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
            yield newUser.save();
            res.send("User has been logged");
        }
    }));
});
router.route('/').get((req, res) => {
    console.log("hi");
    User.find().sort({ $natural: 1 }).limit(5)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});
console.log("routes");
module.exports = router;
