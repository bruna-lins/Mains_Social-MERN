const router = require("express").Router();
const Post = require("../models/Post");

//Create a post

router.post("/", async (req, res) => { 
    const newPost = new Post(req.body)
    try { 
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch(erro) { 
res.status(500).json(erro)
    }
})

//Upadate a post
//Delete a post
//Like a post
//Get a post
//get timeline posts

module.exports = router;
