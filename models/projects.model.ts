export{};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    id: String,
    title: String,
    description: String,
    link: String
}, {
    timestamps: true
});


const Project = mongoose.model('Project', projectSchema);

exports.Project = Project;
exports.projectSchema = projectSchema;