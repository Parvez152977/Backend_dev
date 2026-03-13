import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //basic validation 
        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // if the user already exist
        const existing = await User.findOne({ email: email.toLowerCase() });

        if (existing) {
            return res.status(400).json({ message: "User already exist" });
        }

        //Create user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });
        res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error", error: error.message
        });
    }
}

const loginUser = async (req, res) => {
    try {
        //check if the user is already exist
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email.toLowerCase()
        });
        if (!user) return res.status(400).json({
            message: "User not found"
        });

        //compare passwords
        const isMatch = await user.comparePassword(password);

        if (!isMatch) return res.status(400).json({
            message: "Invalid credential"
        });

        res.status(200).json({
            message: "User has logged in",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}
export {
    registerUser,
    loginUser
}