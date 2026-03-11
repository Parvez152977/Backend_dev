import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true, 
            lowercase: true,
            minLength:1,
            maxLength:30,
            trim: true
        },
        password:{
            type: String,
            minLength:6,
            maxLength:30,
            required: true
        },
        email:{
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
export const User = mongoose.model("User",userSchema);