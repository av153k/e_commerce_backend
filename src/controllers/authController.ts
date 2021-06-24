import { User } from "../models/user";
import jsonwebtoken  from "jsonwebtoken";
import creds from "../private/creds.json";
import bcrypt from "bcrypt";
import { Request, Response } from "express";


export function register(req: Request, res: Response) {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name) {
    return res.status(400).json({ msg: "Please provide name!" });
  } else if (!email) {
    return res.status(400).json({ msg: "Please provide email!" });
  } else if (!password) {
    return res.status(400).json({ msg: "Please provide password!" });
  }

  User.findOne({ email }).then((returnedUser) => {
    if (returnedUser)
    { return res.status(400).json({ msg: "User already exists!" }); }
    
    const reqUser = new User({ name, email, password });

    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        console.log("user salt generation ---- " + error);
      }
      reqUser.password = salt;
      reqUser.save().then(createdUser => {
        console.log("created user id ---- ", createdUser._id);
        jsonwebtoken.sign({ id: createdUser._id }, creds.jwtSecretKey, { expiresIn: creds.jwtExpiresIn }, (err, token) => {
          if (err) {
            console.log("user register jwt token generation error--- ", error);
          }
          console.log("user register jwt token ---", token);
          res.status(200).json({ token: token, user: createdUser });
      } )});
    })
  });
}

export async function login(req: Request, res: Response) {
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

      jsonwebtoken.sign(
        {
          id: fetchedUser._id,
        },
        creds.jwtSecretKey,
        { expiresIn: creds.jwtExpiresIn },
        (error, token) => {
          if (error) {
            throw error;
          }
          res.json({
            token,
            user: {
              id: fetchedUser._id,
              name: fetchedUser.name,
              email: fetchedUser.email,
            },
          });
        }
      );
    });
  });
}

export function getUser(req: Request, res: Response) {
  User.findById(req.params.userId)
    .select("-password")
    .then((fetchedUser) => res.json(fetchedUser));
}
