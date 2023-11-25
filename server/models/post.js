const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema(
  {
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: false },
    description: { type: String, required: false },
    media: { type: String, required: true }
  }, 
  { timestamps: true }
);

exports.Validate = (post) => {
  const schema = {
    title: Joi.string(),
    description: Joi.string(),
    media: Joi.string().required(),
  };

  return Joi.validate(post, schema);
};

exports.Post = mongoose.model("Post", schema);
