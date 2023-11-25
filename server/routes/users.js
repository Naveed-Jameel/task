var express = require('express');
var router = express.Router();
const {User, validate}= require("../models/user")
const bcrypt = require("bcryptjs");


router.post("/signup", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ msg: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send({ msg: "User already registered." });

  user = new User(req.body);
  if (req.body.password) {
    const salt = bcrypt.genSaltSync(12);
    user.password = bcrypt.hashSync(user.password, salt);
  }

  await user.save();

  const token = user.generateAuthToken();
  res.status(200).send({ token, msg:"Signup Successfully!" });
});

router.post("/login", async (req, res) => {

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ msg: "Invalid email or password." });

  const validPassword = bcrypt.compareSync(req.body.password, user.password);
  if (!validPassword) return res.status(400).send({ msg: "Invalid email or password." });

  const token = user.generateAuthToken();
  res.status(200).send({ token, msg:"Login Successfully!" });

});


module.exports = router;
