import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    username : {
        type : String ,
        required : true ,
        unique : true
    } ,
    email : {
        type : String ,
        required : true ,
        unique : true
    } ,
    password : {
        type : String ,
        required : true 
    }
} , {timestamps : true}); // timestamps : true => permet d'ajouter automatiquement deux champs createdAt et updatedAt

// To create the model 
const User = mongoose.model('User' , userShema);

export default User;