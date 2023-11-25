const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  _post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  payload: { type: String }
 
});

const schema = new mongoose.Schema(CommentSchema, { timestamps: true });

exports.Comment = mongoose.model("Comment", schema);
