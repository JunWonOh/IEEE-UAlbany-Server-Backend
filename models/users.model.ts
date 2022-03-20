export{};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {projectSchema} = require("./projects.model")

const userSchema = new Schema({
    discord_id: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    verifiedUser: {
        type: Boolean,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: false
    },
    projects: [projectSchema]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;