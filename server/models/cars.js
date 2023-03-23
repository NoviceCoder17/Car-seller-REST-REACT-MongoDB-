import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    modelName:{
        type:String,
        require: true
    },
    year:{
        type: Number,
        required: true
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Seller"   
    }
})

//seller model 
        //Mongoose has inbuilt object ID, we can use to query or ref
export default mongoose.model("Car",carSchema,"cars")