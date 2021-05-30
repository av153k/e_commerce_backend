import mongoose from "mongoose";
const schema = mongoose.Schema;
const { isValidEmail } = require("validator");

const userSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isValidEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
    minlength: [6, "Minimum password length must be 6 charaters"],
  },
  createdAt: {
    type: Date,
    deault: Date.now,
  },
  lastUpdatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", userSchema);

export { User };
