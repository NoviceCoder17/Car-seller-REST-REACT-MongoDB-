import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/cars" element={<Cars/>} />
      </Routes>
    </>
  );
}

function Home() {
  const [sellerData, setSellerData] = useState({
    fname: "",
    email: ""
  })

  const [carData, setCarData] = useState({
    seller: "",
    modelName: "",
    year: null,
  })

  function onChangeHandler(e) {
    setSellerData({ ...sellerData, [e.target.name]: e.target.value })
  }

  async function onSubmitHandler(e) {
    try {
      e.preventDefault()
      let res = await axios.post("/api/seller/signup", sellerData)
      toast("Seller Added Successfully")
    } catch (error) {
      console.log(error)
      alert("an error occured")
    }
  }

  function onChangeHandler2(e) {
    setCarData({ ...carData, [e.target.name]: e.target.value })
  }

  async function onSubmitHandler2(e) {
    try {
      e.preventDefault()
      let res = await axios.post("/api/cars/add", carData)
      toast("Car Added Successfully")
    } catch (error) {
      console.log(error)
      alert("an error occured")
    }
  }

  return (
    <>
      <ToastContainer />
      <center>
        <h2>Seller Signup</h2>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="fname">First Name</label> <br />
          <input type="text" name='fname' value={sellerData.fname} onChange={onChangeHandler} /><br />
          <label htmlFor="email">Email</label><br />
          <input type="text" name='email' value={sellerData.email} onChange={onChangeHandler} /><br />
          <input type="submit" value="Add Seller" />
        </form>
        <br /><br /><br />
        <h2>Add Cars</h2>
        <form onSubmit={onSubmitHandler2}>
          <label htmlFor="sid">Seller ID</label> <br />
          <input type="text" name="seller" onChange={onChangeHandler2} value={carData.seller} /> <br />

          <label htmlFor="modelName">Model Name</label> <br />
          <input type="text" name="modelName" onChange={onChangeHandler2} value={carData.modelName} /> <br />

          <label htmlFor="year">Model Year</label> <br />
          <input type="text" name="year" onChange={onChangeHandler2} value={carData.year} /> <br />

          <input type="submit" value="Add Car" />
        </form>
        <br /><br />
        <Link to="/cars">Go To Cars</Link>
      </center>
    </>
  )
}

function Cars() {
  const [cars , setCars] = useState([])
  useEffect(()=>{
    async function fetchCars(){
      try {
        const res = await axios.get("/api/cars")
        setCars(res.data.carData)
      } catch (error) {
        console.log(error)
        alert("an error occured")
      }
    }
    fetchCars()
  },[])

  return (
    <>
      <div>
        <h1>List of Cars</h1>
        <hr />
    {cars.map((car,i)=>{
      return (
        <ul key={i}>
          <li>Car Model Name : {car.modelName}</li>
          <li>Year : {car.year}</li>
          <li>
            <h5>Seller Info</h5>
            <ul>
              <li> Seller Name : {car.seller.fname}</li>
              <li>Seller Email : {car.seller.email}</li>
            </ul>
          </li>
        </ul>
      )
    })}
      </div>
    </>
  )
}

export default App;