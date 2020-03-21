const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        unique: true
    },
    skills: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String
    }
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;