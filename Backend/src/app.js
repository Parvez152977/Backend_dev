import express, { json } from "express";

const app = express();

app.use(json());
// Router import
import userRouter from "./routes/user.route.js";

// Router declaration 
app.use("/api/v1/users", userRouter);

//example route: http://localhost:4000/api/v1/users/register
export default app; //create an express app

