var express = require("express");
const flash = require("express-flash");
var router = express.Router();
const session = require("express-session");
const upload = require("./multer");
const jwt = require("jsonwebtoken");
const usersModel = require("../db/usersModel");
const songsModel = require("../db/songsModel");
require('dotenv').config(


router.use(flash());
router.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "hehehheh",
  })
);

const isLoggedIn = (req, res, next) => {
  if (req.cookies.token === "") res.redirect("/");
  else {
    const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
    req.user = data;
    next();
  }
};


router.get("/", function (req, res, next) {
  res.render("login");
});
router.get("/home",isLoggedIn, async function (req, res, next) {
  const searchQuery = req.query.search || '';

let searchCriteria = {};

if (searchQuery) {
  searchCriteria = { songTitle: { $regex: searchQuery, $options: "i" } };
}

const songs = await songsModel.find(searchCriteria);




  const user = await usersModel.findOne({email : req.user.email})
  let loginFlag = false;
  if(!req.cookies.token){
    loginFlag = true;
  }
  else{
    loginFlag = false;
  }
  res.render("index", {songs, user,loginFlag});
});

router.post(
  "/upload",isLoggedIn,
  upload.fields([{ name: "audioFile" }, { name: "imageFile" }]),
  async (req, res) => {
    const user = await usersModel.findOne({email: req.user.email})
    const { title, artist, category } = req.body;
    const audioFilename = req.files["audioFile"][0].filename;
    const imageFilename = req.files["imageFile"][0].filename;
    const newSong = await songsModel.create({
      songTitle: title,
      songArtist: artist,
      songCategory: category,
      songUrl: audioFilename,
      songCoverUrl: imageFilename,
      likes: [],
    });
    user.Playlist.push(newSong._id);
    await user.save();
    req.flash("success", "Uploaded song successfully");
    res.redirect("/home");
  }
);

router.get("/fav", isLoggedIn , async function (req, res, next) {
  const user = await usersModel.findOne({email: req.user.email}).populate('likedsongs')
  res.render("fav", {user});
});

router.get("/addfav/:songId",isLoggedIn, async function (req, res, next){
  const user = await usersModel.findOne({email: req.user.email})
  const song = await songsModel.findOne({_id: req.params.songId})
  const songid = req.params.songId;

  if(user.likedsongs.indexOf(songid) === -1) {
    user.likedsongs.push(songid);
  }
  else{
    user.likedsongs.splice(user.likedsongs.indexOf(songid), 1);
  }

  if(song.likes.indexOf(user._id) === -1){
    song.likes.push(user._id);
  }
  else{
    song.likes.splice(song.likes.indexOf(user._id), 1);
  }
  await song.save();
  await user.save();
  console.log("Liked song saved")
  res.redirect("/home")
})


router.get("/playlist", isLoggedIn , async function (req, res, next) {
  const user = await usersModel.findOne({email: req.user.email}).populate('Playlist')
  res.render("playlist", {user});
});

module.exports = { router, isLoggedIn };
























