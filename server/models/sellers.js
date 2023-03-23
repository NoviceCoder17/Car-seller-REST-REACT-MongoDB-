import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cars:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Car"
        }
    ]
})
export default mongoose.model("Seller", sellerSchema, "sellers")