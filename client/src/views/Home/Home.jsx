import React,{useEffect} from "react";
import Navbar from "../../components/Navbar/Navbar";
import './Home.css'

function Home() {
  useEffect(()=>{
    document.title="DJ Expense Tracker"
  },[])
  return (
    <div className="bg-img">
      <Navbar />
      <h1 className="text-center text-4xl mt-48 text-white font-serif">
      <span className="text-gray-500 text-6xl">Hi! Welcome. </span>
       <p className="text-gray-500 mt-5 text-3xl">Feel free to budget your expenses</p></h1>
    </div>
  );
}

export default Home;
