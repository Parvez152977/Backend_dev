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

//update posts
const updatePost = async (req, res) => {
    try {
        //basic validation if the field is empty

        //{name: x , description : y, age: z}->[name,description,age]
        if (Object.keys(req.body).length == 0) {
            return res.status(400).json({
                message: "No data for update"
            });
        }
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        };
        res.status(200).json({
            message: "Post updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

//Delete post
const deletePost = async (req, res) => {
    try {
        const postDeleted = await Post.findByIdAndDelete(req.params.id);
        if (!postDeleted) {
            return res.status(404).json({
                message: "Post not found"
            })
        }
        res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export {
    createPost,
    getPosts,
    updatePost,
    deletePost
}
