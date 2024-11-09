import React, { useEffect } from "react";
import Navbar from "./../../components/Navbar/Navbar.jsx";
import Img from "./../../views/About/meme.jpg";
import { ImLinkedin } from "react-icons/im";
import { FaGithubSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiPeerlist } from "react-icons/si";

function About() {
  useEffect(() => {
    document.title = "DJ Expense Tracker - About";
  }, []);
  return (
    <div>
      <Navbar />
      <div className="w-4/6 text-center mx-auto mt-16 font-serif ">
        Hey there! Welcome to my personal project, the{" "}
        <span className="text-green-500 text-2xl"> DJ </span> Expense
        Tracker. <br />I made this because handling money can be tricky, and I
        wanted to create a simple tool to help me and others keep track of
        expenses without any hassle.
      </div>
      <div className="border-2 flex items-center bg-green-500  mt-10 gap-x-12 justify-center lg:w-[700px] md:w-[500px]  sm:w-[300px] mx-auto p-6 rounded-md shadow-md flex-wrap  border-green-600 ">
        <div>
          <img
            src={Img}
            alt="img"
            className="h-44 w-44 rounded-full border-2 border-green-500"
          />
          <p className="flex justify-around mt-5 bg-white p-2 rounded-md shadow-md">
            <ImLinkedin className="text-blue-900 text-3xl" />
            <FaGithubSquare className="text-black-900 text-3xl" />
            <MdEmail className="text-red-600 text-3xl" />
            <SiPeerlist className="text-green-500 text-3xl" />
          </p>
        </div>
        <div className="w-96 bg-white mt-3 rounded-md shadow-md">
          <h1 className="text-center text-2xl p-1 text-green-500 underline font-serif">
            Daniel Jacob Naval
          </h1>
          <p className="p-4 text-start font-extra-light text-[15px]">
            I used a cool tech stack called MERN
            (MongoDB, Express.js, React, Node.js) to build awesome,
            user-friendly sites. Whether it's making things look great or work
            smoothly, I'm all about turning ideas into fantastic web
            experiences. Let's bring your website dreams to life!{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
