const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    name: {
         type: String
    },
    downloadURL: {
        type: String
    },
    authorID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  
    }
});

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;