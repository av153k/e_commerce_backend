import { User } from "../models/user";
import * as jwt from "jsonwebtoken";
import config from "config";
import bcrypt from "bcrypt";

register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    res.status(400).json({ msg: "Please provide name!" });
  } else if (!email) {
    res.status(400).json({ msg: "Please provide email!" });
  } else if (!password) {
    res.status(400).json({ msg: "Please provide password!" });
  }

  User.findOne({ email }).then((returnedUser) => {
    if (returnedUser)
      return res.status(400).json({ msg: "User already exists!" });
  });
};
login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: "Please enter all fields!" });
  }

  User.findOne({ email }).then((fetchedUser) => {
    if (!fetchedUser) {
      return res.status(400).json({ msg: "User does not exist!" });
    }

    bcrypt.compare(password, fetchedUser.password).then((matched) => {
      if (!matched) {
        return res.status(400).json({ msg: "Incorrect password !!" });
      }

      jwt.sign(
        {
          id: fetchedUser._id,
        },
        config.get("jwtsecret"),
        { expiresIn: 3600 },
        (error, token) => {
          if (error) {
            throw error;
          }
          res.json({
            token,
            user: {
              id: fetchedUser.__id,
              name: fetchedUser.name,
              email: fetchedUser.email,
            },
          });
        }
      );
    });
  });
};

getUser = (req, res) => {
  User
    .findById(req.user.id)
    .select("-password")
    .then((fetchedUser) => res.json(fetchedUser));
};

export { register, login, getUser };
