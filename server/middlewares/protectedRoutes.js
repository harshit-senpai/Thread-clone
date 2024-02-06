import User from "./../schema/UserModel.js";
import jwt  from "jsonwebtoken";

const protectedRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(req.cookies.jwt);

    if (!token) {
      return res.status(401).json({
        status: "unauthorized",
        message: "You are not authorized to access this route",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("+password");

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    console.log(error);
  }
};

export default protectedRoutes;
