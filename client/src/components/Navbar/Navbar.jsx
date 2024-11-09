import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginImg from "./switch2.jpg";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [user, setUser] = useState({});

  useEffect(() => {
    //get Loggedin user from local storage
    const getLoggedInUserFromLocalStorage = JSON.parse(
      localStorage.getItem("user" || "{}")
    );
    setUser(getLoggedInUserFromLocalStorage);
    console.log(getLoggedInUserFromLocalStorage);

  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <nav className="bg-white shadow p-4">
          <div className="container mx-auto flex justify-between items-center ">
            {/* Logo */}
            <div className="text-gray-500 hover:text-gray-500 text-xl font-bold flex-grow font-mono cursor-pointer">
              DJ Expense Tracker
            </div>

            {/* Navbar Links */}
            <div className="hidden md:flex items-center space-x-6 flex-grow">
              <Link to="/" className="text-black hover:text-gray-500">
                Home
              </Link>
              <Link to="/about" className="text-black hover:text-gray-500">
                About
              </Link>
              <Link
                to="/addtransaction"
                className="text-black hover:text-gray-500">
                Add Transaction
              </Link>
              <Link
                to="/showtransaction"
                className="text-black hover:text-gray-500">
                Show Transaction
              </Link>
              <Link to="/signup" className="text-black hover:text-gray-500">
                Signup
              </Link>
              <Link to="/login" className="text-black hover:text-gray-500">
                Login
              </Link>
            </div>

            <div className="hidden md:flex align-start text-black hover:text-gray-500 cursor-pointer font-semibold">
              {user?.userName ? "Welcome back," : ""} {user?.userName || "Hello User"}!{" "}
              {user?.userName ? (
                <span
                  className="text-black hover:text-gray-500 cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                  }}>
                  {" "}
                  <img
                    src={LoginImg}
                    alt="login-img"
                    style={{ height: "28px", marginLeft: "10px" }}
                  />
                </span>
              ) : null}
            </div>

            {/* Mobile Navbar Toggle */}
            <div className="md:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="text-black hover:text-gray-500">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Navbar (hidden by default) */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? "" : "hidden"
          } bg-gray-100 p-4 text-black `}>
        <ul className="list-none p-0 m-0">
          <li>
            <Link to="/" className="block py-2 hover:text-gray-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="block py-2 hover:text-gray-500">
              About
            </Link>
          </li>
          <li>
            <Link
              to="/addtransaction"
              className="block py-2 hover:text-gray-500">
              Add Transaction
            </Link>
          </li>
          <li>
            <Link
              to="/showtransaction"
              className="block py-2 hover:text-gray-500">
              Show Transaction
            </Link>
          </li>
          <li>
            <Link to="/signup" className="block py-2 hover:text-gray-500">
              Signup
            </Link>
          </li>
          <li>
            <Link to="/login" className="block py-2 hover:text-gray-500">
              Login
            </Link>
          </li>

          <div className="font-semibold">
            {user?.userName ? "Welcome back," : ""} {user?.userName || "Hello User "}{" "}
            !
            {user?.userName ? (
              <span
                className="text-black hover:text-gray-500 cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}>
                {" "}
                <img
                  src={LoginImg}
                  alt="login-img"
                  style={{ height: "28px", marginLeft: "10px" }}
                />
              </span>
            ) : null}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
