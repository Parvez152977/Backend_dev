import express, { json } from "express";

const app = express();

app.use(json());
// Router import
import userRouter from "./routes/user.route.js";

import postRouter from "./routes/post.route.js";

// Router declaration 
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

//example route: http://localhost:4000/api/v1/users/register
//http://localhost:4000/api/v1/posts/create_post
export default app; //create an express app

