const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/SpotifyRedesign");

const schema = mongoose.Schema({
    songTitle: {
        type: String,
        require: true
    },
    songArtist: {
        type: String,
        require: true
    },
    songCategory: {
        type: String,
        require: true
    },
    songUrl: {
        type: String,
        require: true
    },
    songCoverUrl: {
        type: String,
        require: true
    },
    likes:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
        },
    ]
    
})

module.exports = mongoose.model('songs',schema)