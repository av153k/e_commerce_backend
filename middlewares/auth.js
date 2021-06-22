import jwt from "jsonwebtoken";
import * as creds from "../config/creds.json";

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({
      msg: "No token found. Authorization failed",
    });
  }

  try {
    const decodedToken = jwt.verify(token, creds.jwtSecretKey);

    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token is not valid !!" });
  }
}

export { auth };
