import jwt from "jsonwebtoken";
import creds from "../private/creds.json";
import { Request, Response, NextFunction } from "express";

function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({
      msg: "No token found. Authorization failed",
    });
  }

  try {
    const decodedToken = jwt.verify(token, creds.jwtSecretKey);
    const user = req.user;

    if (user) user.id = decodedToken;
    next();
  } catch (error) {
    console.log("Auth error ---", error);
    res.status(400).json({ msg: "Token is not valid !!" });
  }
}

export { auth };
