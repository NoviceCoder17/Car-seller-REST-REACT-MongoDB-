import mongoose from "mongoose";
async function dbConnect(){
    try{
        await mongoose.connect("mongodb+srv://premashivarama:Fwt5Eoy7Iqd8xguh@prema.jrf1mhl.mongodb.net/car-seller")
        console.log("MongoDB is connected")
    }
    catch(error){
        console.log(error)
    }
}

dbConnect()