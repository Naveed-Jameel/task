var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth")
const { Post, Validate } = require("../models/post")
const { Comment } = require("../models/comment")


router.get("/", async (req, res) => {

  try {
    const posts = await Post.find().sort({ _id: -1 })
    return res.status(200).send({ posts })
  }
  catch {
    return res.status(500).send({msg: "Interval server error" })
  }
});

router.get("/:id", async (req, res) => {

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send({ msg: "Post not found" });

    const comments = await Comment.find({ _post: req.params.id }).sort({ _id: -1 })
    
    return res.status(200).send({ post, comments })
  }
  catch {
    return res.status(500).send({msg: "Interval server error" })
  }
});


router.post("/",auth, async (req, res) => {

  const data = {
    title: req.body.title,
    description: req.body.description,
    media: req.body.media,
  }

  try {
    const { error } = Validate(data);
    if (error) return res.status(400).send({ msg: error.details[0].message });
    data._user=req.user._id
    const post = new Post(data);
    await post.save();

    return res.status(200).send({ msg: "Upload Successfully !" })
  }
  catch(err) {
    console.log(err)
    return res.status(500).send({ msg: "Interval server error" })
  }
});

router.delete("/:id", auth, async (req, res) => {

  try {
    const post= await Post.findById(req.params.id)
    if(post._user != req.user._id) return res.status(401).send({msg: "Unauthorized" })

    await Post.findByIdAndDelete(req.params.id)
    return res.status(200).send({ msg: "Delete Successfully!" })
  }
  catch {
    return res.status(500).send({msg: "Interval server error" })
  }
});

router.put("/:id",auth, async (req, res) => {

  try {
    
    const post= await Post.findById(req.params.id)
    if(post._user != req.user._id) return res.status(401).send({msg: "Unauthorized" })

    await Post.findByIdAndUpdate( req.params.id, req.body )
    return res.status(200).send({ msg: "Update Successfully!" })
  }
  catch {
    return res.status(500).send({msg: "Interval server error" })
  }
});

module.exports = router;
