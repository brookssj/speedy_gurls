/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Theme = require("./models/theme");
const Memory = require("./models/memory");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|



router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});


router.get("/memory", (req, res) => {
  Memory.find({ parent: req.query.parent, creator_id: req.user._id }).then((memories) => {
    res.send(memories);
  });
});

router.post("/memory", auth.ensureLoggedIn, (req, res) => {
  const newMemory = new Memory({
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent: req.body.parent,
    content: req.body.content,
  });

  newMemory.save().then((memory) => res.send(memory));
});

router.post("/theme", auth.ensureLoggedIn, (req, res) => {
  const newTheme = new Theme({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
  });

  newTheme.save().then((theme) => res.send(theme));
});

router.get("/themes", (req, res) => {
  // empty selector means get all documents
  Theme.find({creator_id: req.user._id}).then((themes) => res.send(themes));
});
 
// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
