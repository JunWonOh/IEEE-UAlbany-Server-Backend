var mongoose_model = require('mongoose');
var Schema = mongoose_model.Schema;
var userSchema = new Schema({
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
}, {
    timestamps: true
});
var User = mongoose_model.model('User', userSchema);
module.exports = User;
