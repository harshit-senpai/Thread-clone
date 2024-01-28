import User from "./../schema/UserModel.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      status: "Unauthorized",
      message: "You are not logged in to get access",
    });
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return res.statusCode(401).json({
      status: "Unauthorized",
      message: "The user belonging to this token no longer exist",
    });
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
};
