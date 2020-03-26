const mongoose = require('mongoose');
//Marked for deletion
const AccountSchema = new mongoose.Schema({
    username: {
        type: String
    },
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'  
    },
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: `Song`
        }   
    ], 

});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;

