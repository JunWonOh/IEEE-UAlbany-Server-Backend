// export{};

const mongoose2 = require('mongoose');
const Schema = mongoose2.Schema;
// const {projectSchema} = require("./projects.model")

const projectSchema = new Schema({
    id: String,
    title: String,
    description: String,
    link: String
});



const userSchema = new Schema({
    id: {
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

const User = mongoose2.model('User', userSchema);
const Project = mongoose2.model('Project', projectSchema);

module.exports = User;