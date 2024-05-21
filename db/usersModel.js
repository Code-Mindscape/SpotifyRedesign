const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/SpotifyRedesign");

const schema = mongoose.Schema({
    fullname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    likedsongs:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'songs'
        },
    ],
    Playlist:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'songs'
        },
    ]
})

module.exports = mongoose.model('users',schema)