import User from "../schema/UserModel.js";

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

    res.status(201).json({
      status: "Success",
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Internal Server Error",
      message: err.message,
    });
  }
};
