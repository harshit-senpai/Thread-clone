import Post from "./../schema/PostModel.js";
import User from "./../schema/UserModel.js";

export const createPost = async (req, res) => {
  try {
    const { postedBy, text, img } = req.body;

    if (!text || !postedBy) {
      res.status(400).json({
        status: "Failed",
        message: "Please enter all fields",
      });
    }

    const user = await User.findById(postedBy);

    if (!user) {
      res.status(404).json({
        status: "Failed",
        message: "User does not exist",
      });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      res.status(403).json({
        status: "Unauthorized",
        message: "You are not authorized to create a post",
      });
    }

    const maximumLength = 500;

    if (text.length > maximumLength) {
      res.status(400).json({
        status: "Failed",
        message: `Text length should be less than ${maximumLength} words`,
      });
    }

    const newPost = new Post({
      postedBy: postedBy,
      text: text,
      img: img,
    });

    newPost.save();

    res.status(201).json({
      status: "Success",
      data: {
        newPost,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: "Something went wrong",
    });
  }
};


