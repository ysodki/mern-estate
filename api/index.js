import express from "express";
const app = express();
const port = process.env.PORT || 3040;

app.get("/" , (req , res)=>{
    res.json({'message' : "Hello in estate backend app"});
});

app.listen(port , ()=>{
    console.log(`Server is runing on port ${port}`);
});