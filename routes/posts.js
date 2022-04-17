const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//Create a post

router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (erro) {
        res.status(500).json(erro)
    }
});

//Update a post

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("O post foi atualizado!")
        } else {
            res.status(403).json("Você só pode editar seu próprio post.")
        }
    } catch (erro) {
        res.status(500).json(erro);
    }
});

//Delete a post

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("O post foi deletado!")
        } else {
            res.status(403).json("Você só pode deletar seu próprio post.")
        }
    } catch (erro) {
        res.status(500).json(erro);
    }
});

//Like & Dislike a post

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("O post foi curtido!")
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("A curtida foi retirada.")
        }
    } catch (erro) {
        res.status(500).json(erro);
    }
});
//Get a post

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (erro) {
        res.status(500).json(erro);
    }
});

//get timeline posts

router.get("/timeline/all", async (req, res) => {
    try {
      const currentUser = await User.findById(req.body.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts))
    } catch (erro) {
      res.status(500).json(erro);
    }
  });

module.exports = router;
