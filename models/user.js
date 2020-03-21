//Because I am using a mongoose-bcrypt the fields that I want protected are automatically 
//Hashed and salted with a default number of rounds = 5
//You can now compare the salted and hashed password using 'verifyPassword' ==> async

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true 
    },
    password: {
        type: String, 
        required: true,
        bcrypt: true 
    },
    name: {
        type: String,
        default: ""
    },
    skills: {
        type: String,
        default: ""
    },
    genre: {
        type: String,
        default: ""
    }
  
});
UserSchema.plugin(require('mongoose-bcrypt'));

const User = mongoose.model('User', UserSchema);
module.exports = User;