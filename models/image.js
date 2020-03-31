const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
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

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;