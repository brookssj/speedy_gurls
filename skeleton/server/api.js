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
  Memory.find({ parent: req.query.parent }).then((memories) => {
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

  newStory.save().then((theme) => res.send(theme));
});


// router.post("/information", auth.ensureLoggedIn, (req, res) => {
//   const info = new information({
//     creator_id: req.user._id,
//     name: req.user.name,
//     email: req.user.email,
//     location: req.user.location,
    
//   });
//   Info.save().then((info)=> res.send(info));
// });


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
