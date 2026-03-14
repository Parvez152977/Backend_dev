import { Post } from "../models/post.model.js";

//create Post
const createPost = async (req, res) => {
    try {
        const { name, description, age } = req.body;

        if (!name || !description || !age) {
            return res.status(400).json({
                message: "All field required"
            });
        }
        const post = await Post.create({ name, description, age });

        return res.status(201).json({
            message: "Post is created successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}


//get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}
export {
    createPost,
    getPosts 
}
