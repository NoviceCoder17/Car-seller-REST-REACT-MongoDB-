import express from "express";
const app = express();
const port = 5000;
import "./dbConnect.js";
import sellerModel from "./models/sellers.js"
import CarModel from "./models/cars.js";
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Test");
});

/*
    API : /seller/signup
    Method : POST
*/
app.post("/api/seller/signup", async (req, res) => {
    try {
        const seller = new sellerModel(req.body);
        await seller.save();
        res.status(200).json({ success: "Seller Added to the DB" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});


/*
    API : /cars/add/
    Method : POST
*/
app.post("/api/cars/add", async (req, res) => {
    try {
        const cars = new CarModel(req.body);
        await cars.save();
        const seller = await sellerModel.findById(req.body.seller);
        seller.cars.push(cars);
        await seller.save();
        res.status(200).json({ success: "Car Added to the DB" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});

/*
    API: /seller/cars
    METHOD : GET
*/

// carModel.find({})

app.get("/api/seller/cars", async (req,res)=>{
    try {
        const sellerData = await sellerModel.findById(req.body.seller, "-_id -__v").populate("cars","-_id -seller -__v") // remove id and --v 
        res.status(200).json({success : 'Seller data fetched' , sellerData})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
})

app.get("/api/cars", async (req,res)=>{
    try {
        const carData = await CarModel.find({},"-_id -__v").populate("seller", "-_id -__v -cars")
        res.status(200).json({success : 'data fetched' , carData})

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
})


app.listen(port, () => {
    console.log(`Server started on ${port}`)
})