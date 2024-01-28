import User from "../schema/UserModel.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "strict",
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "Success",
    token,
    data: {
      user,
    },
  });
};

export const signUp = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const isUserExist = await User.findOne({ email: email });

    if (isUserExist) {
      res.status(403).json({
        status: "Failed",
        message: "User already exists",
      });
    }
    const newUser = await User.create({
      name: name,
      email: email,
      username: username,
      password: password,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(500).json({
      status: "Internal Server Error",
      message: err.message,
    });
  }
};

export const SignIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Please provide email and password",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: "unauthorized",
      message: "Invalid email or password",
    });
  }

  createSendToken(user, 200, res);
};

export const signOut = (req, res) => {
  try {
    res.cookie("jwt", "", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({
      status: "success",
      message: "Logged Out SUccessfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "Internal Server Error",
      message: err.message,
    });
  }
};

export const followUser = async (req, res) => {
  try {
    const { id } = req.params;

    const modifyUser = await User.findById(id);
    const loggedInUser = await User.findById(req.user._id);

    if (id === req.user._id.toString()) {
      return res.status(400).json({
        status: "Bad request",
        message: "You cannot follow yourself",
      });
    }

    console.log(`to be followed: ${id} who is following ${req.user._id}`);

    if (!modifyUser || !loggedInUser) {
      return res.status(400).json({
        status: "Failed",
        message: "User does not exists",
      });
    }

    const isFollowing = await loggedInUser.following.includes(id);

    if (isFollowing) {
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      return res.status(200).json({
        status: "Success",
        message: "Unfollowed Successfully",
      });
    } else {
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      return res.status(200).json({
        status: "Success",
        message: "Followed Successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Internal Server Error",
      message: err.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  const { name, username, currentPassword, newPassword, bio, profilePic } =
    req.body;
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).select("+password");

    if (req.params.id !== userId.toString()) {
      return res.status(401).json({
        status: "unauthorized",
        message: "You are not authorized to update others profile",
      });
    }

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "user does not exist",
      });
    }

    if (currentPassword && newPassword) {
      if (!(await user.correctPassword(currentPassword, user.password))) {
        return res.status(401).json({
          status: "unauthorized",
          message: "Password entered is incorrect",
        });
      }
      user.password = newPassword;
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.profilePic = profilePic || user.profilePic;

    user.save();

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({
      status: "Internal Server Error",
      message: err.message,
    });
  }
};
