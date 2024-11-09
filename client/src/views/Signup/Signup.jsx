import React, { useEffect, useState } from "react";
import "./Signup.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import showToast from 'crunchy-toast'
import axios from "axios";
import swal from "sweetalert";

function Signup() {
  const [name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[contact, setContact] = useState('');
  const[address, setAddress] = useState('');
  const[password, setPassword] = useState('');
  const[bank, setBank] = useState("other");

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem('user' || '{}'));
    if (storageUser?.email) {
      swal({
        title: `👋 ${storageUser.userName}`,
        text: "There is no need to Signup - You're already Logged In!",
        icon: "info",
      }).then(() => {
        window.location.href = "/";
      });
    }
  }, []); 

  // api reqest
  async function signUpUser() {
    if (!name) {
      showToast("name is required", "alert", 4000);
      return;
    }
    if (!email) {
      showToast("Email is required", "alert", 4000);
      return;
    }
    if (!contact) {
      showToast("Contact number is required", "alert", 4000);
      return;
    }
    if (!password) {
      showToast("Password is required", "alert", 4000);
      return;
    }
    if (!address) {
      showToast("Address is required", "alert", 4000);
      return;
    }
  
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/signups`, {
      userName : name,
      email : email,
      password : password,
      contactNumber : contact,
      address : address,
      bankName : bank
    });

    console.log(response.data);
    if (response?.data?.success) {
      swal({
        title: `Hey ${response?.data?.data?.userName} - You're Successfully Signup`,
        text: "Hello and Welcome here! You're now an important part of our financial journey.🎉",
        icon: "success",
      }).then(() => {
        window.location.href = "/login";
      });
    } else {
      swal({
        title: "Error",
        text: "Unothrized user",
        icon: "error",
      });

      setName("");
      setEmail("");
      setContact("");
      setPassword("");
      setAddress("");
      setBank("");
    }
  }

  return (
    <div>
      <Navbar />
      <form className="form mx-auto mt-7">
        <span className="signup">Sign Up</span>

  
        <h1>Create your own account</h1>

        <input 
        type="text"
         placeholder="Name" 
         className="form--input mt-2"
         value={name}
         onChange={(e) => setName(e.target.value)}
         />

        <input
          type="email"
          placeholder="Email address"
          className="form--input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Contact Number"
          className="form--input"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <input
          type="text"
          placeholder="Address"
          className="form--input"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input 
        type="password"
         placeholder="Password" 
         className="form--input"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
          />

        <div className="relative inline-block text-left mt-3 w-full">
          <select className="h-9 block appearance-none w-full bg-green-200 border border-gray-300 text-green-500 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={bank} onChange={(e)=>{setBank(e.target.value)}}>
            <option value="state-bank">State Bank of India</option>
            <option value="kotak-bank">Kotak Bank</option>
            <option value="hdfc-bank">HDFC Bank</option>
            <option value="axis-bank">Axis Bank</option>
            <option value="badoda-bank">Badoda Bank</option>
            <option value="other">Others</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path d="M10 12.76l-1.41 1.41L6 10.58l-1.41 1.42L10 15 18 7l-1.41-1.41L10 12.76z" />
            </svg>
          </div>
        </div>

        <div className="form--marketing">
          <label htmlFor="okayToEmail" className="checkbox text-sm mt-3">
            If you have an account,{" "}
            <b>
              <Link to="/login">
                <u className="text-center cursor-pointer font-bold">
                  Login here
                </u>
              </Link>
            </b>
          </label>
        </div>
        <button type="button" className="form--submit" onClick={signUpUser}>Sign up</button>
      </form>
    </div>
  );
}

export default Signup;
