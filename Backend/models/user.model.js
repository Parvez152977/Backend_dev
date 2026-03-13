import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            minLength: 1,
            maxLength: 30,
            trim: true
        },
        password: {
            type: String,
            minLength: 6,
            maxLength: 30,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        }

    },
    {
        timestamps: true
    }
)


// before saving any password we need to hash it.
userSchema.pre("save", async function () {
    try {
        if (!this.isModified("password")) return;

        // Hash the password
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        // Throw error to be caught by Mongoose
        throw error;
    }
});

// compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema);