const mongoose = require('mongoose');
//Marked for deletion
const AccountSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true
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

const Account = mongoose.model('Account', AccountSchema);

