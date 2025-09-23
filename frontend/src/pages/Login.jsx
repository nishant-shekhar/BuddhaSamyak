import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Login = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqC6vWB4BQcNY7-g8tU6p030iJG2iSEmISQ35Hf3F_PsfVjdc9RxocbYe3PYR1ixbo4ME6WPNDJUbQ8hBDKuKot3JeU5JcmGvol0y3LLmF7EaErmt_HhaRFOtzDEwYgHPJLGQ-r=s1360-w1360-h1020-rw')",
      }}
    >
      <div className="bg-white/ backdrop-blur-sm w-full h-screen mx-auto flex flex-col md:flex-row overflow-hidden ">
        {/* Left Side */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-between">
          <div>
  <h2 className="text-4xl font-bold mb-4 text-gray-800">Welcome to the Buddha Samyak Museum Admin Portal</h2>
  <p className="text-gray-600 text-sm">
    Manage and maintain the digital presence of the Buddha Samyak Museum. Ensure a seamless experience for all users by keeping exhibits, events, and content up to date.
  </p>
  {/* <ul className="text-gray-500 mt-4 list-disc pl-5 text-sm space-y-1">
    <li>Manage gallery content and virtual tours</li>
    <li>Update and schedule upcoming exhibitions</li>
    <li>Oversee registered user activity and feedback</li>
  </ul> */}
</div>

          <div className="mt-10  p-4 rounded-lg">
            <h3 className="text-center text-white text-sm font-semibold mb-2">Follow us on</h3>
            <div className="flex justify-center gap-6 text-2xl">
              <a href="#" className="text-white hover:scale-110 transition"><FaFacebook /></a>
              <a href="#" className="text-white hover:scale-110 transition"><FaInstagram /></a>
              <a href="#" className="text-white hover:scale-110 transition"><FaTwitter /></a>
              <a href="#" className="text-white hover:scale-110 transition"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        {/* Right Side */}
<div className="w-full md:w-1/2  p-10 bg-black/70 text-white flex flex-col justify-center">
  <h3 className="text-3xl font-semibold mb-6 text-center">Admin Login</h3>

  <div className="max-w-sm mx-auto space-y-6 w-full">
    {/* Email Input */}
    <div className="relative">
      <input
        type="email"
        className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-300 text-sm text-white placeholder-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
        placeholder="Enter email"
      />
      <div className="absolute inset-y-0 start-0 flex items-center ps-2">
        <svg className="size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
          stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
    </div>

    {/* Password Input */}
    <div className="relative">
      <input
        type="password"
        className="peer py-2.5 sm:py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-300 text-sm text-white placeholder-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300"
        placeholder="Enter password"
      />
      <div className="absolute inset-y-0 start-0 flex items-center ps-2">
        <svg className="size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
          stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" />
          <circle cx="16.5" cy="7.5" r=".5" />
        </svg>
      </div>
    </div>

    <button className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition font-semibold">
      Login
    </button>

    <p className="text-center text-sm text-gray-300 mt-4">
      Don’t have an account? <a href="#" className="underline hover:text-white">Sign up</a>
    </p>
  </div>
</div>

      </div>
    </div>
  );
};

export default Login;
