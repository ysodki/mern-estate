import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3040;

// TO CONNET MONGODB 
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json()); 
app.use('/api/user' , userRouter);
app.use("/api/auth" , authRouter);
app.listen(port , ()=>{
    console.log(`Server is runing on port ${port}`);
});