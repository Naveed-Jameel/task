var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth")
const { Post } = require("../models/post")
const { Comment } = require("../models/comment")


router.post("/", auth, async (req, res) => {
  try {
    req.body._user = req.user._id;

    const comment = new Comment(req.body);
    await comment.save();

    return res.status(200).send({ comment, msg:"Comment Added Successfully!" })
  }
  catch {
    return res.status(500).send({ msg: "Interval server error" })
  }
});

router.delete("/:id", auth, async (req, res) => {

  try {
    const comment= await Comment.findById(req.params.id)
    if(comment._user != req.user._id) return res.status(401).send({msg: "Unauthorized" })

    await Comment.findByIdAndDelete(req.params.id)
    return res.status(200).send({ msg: "Comment Deleted Successfully!" })
  }
  catch {
    return res.status(500).send({msg: "Interval server error" })
  }
});

router.put("/:id", auth, async (req, res) => {
  try {

    const comment= await Comment.findById(req.params.id)
    if(comment._user != req.user._id) return res.status(401).send({msg: "Unauthorized" })
    
    await Comment.findByIdAndUpdate( req.params.id, req.body )
    return res.status(200).send({ msg: "Comment Update Successfully!" })
  }
  catch {
    return res.status(500).send({msg: "Interval server error" })
  }
});

module.exports = router;
