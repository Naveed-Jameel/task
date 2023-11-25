const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    }
  },
  { timestamps: true }
); 

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.JWT_KEY || "jwtPrivateKey"
  );
  return token;
};

function validateUser(user) {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255)
  };

  return Joi.validate(user, schema);
}

exports.User = mongoose.model("User", userSchema);
exports.validate = validateUser;
