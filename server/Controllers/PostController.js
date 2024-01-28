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

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: "Failed",
        message: "Post does not exist",
      });
    }

    res.status(200).json({
      status: "Success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: "Something went wrong",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: "Failed",
        message: "Post not found",
      });
    }

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: "failed",
        message: "You are not authorized to delete this post",
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "Success",
      message: "Post deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const likeUnlike = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: "Failed",
        message: "Post not found",
      });
    }

    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({
        status: "Success",
        message: "Post unliked successfully",
      });
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json({
        status: "Success",
        message: "Post liked successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: "Something went wrong",
    });
  }
};

export const createReply = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;
    const { id: postId } = req.params;
    const username = req.user.username;
    const profilePic = req.user.profilePic;

    if (!text) {
      return res.status(404).json({
        status: "Failed",
        message: "Please enter all fields",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        status: "Failed",
        message: "Post not found",
      });
    }

    const reply = { username, userId, text, profilePic };

    post.replies.push(reply);

    await post.save();

    res.status(201).json({
      status: "Success",
      message: "Reply created Successfully",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: "Something went wrong",
    });
  }
};

export const getFeed = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

    const following = user.following;

    const feed = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      status: "Success",
      data: {
        feed,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: "Something went wrong",
    });
  }
};
