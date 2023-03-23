import mongoose from "mongoose";
async function dbConnect(){
    try{
        await mongoose.connect("mongodb+srv://car-seller")
        console.log("MongoDB is connected")
    }
    catch(error){
        console.log(error)
    }
}

dbConnect()
