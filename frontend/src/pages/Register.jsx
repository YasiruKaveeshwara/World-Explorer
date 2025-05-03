import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { username, email, password });
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className='relative flex items-center justify-center min-h-screen px-4'>
      {/* Background image */}
      <img src='/images/regions/world.jpg' alt='register-bg' className='absolute inset-0 object-cover w-full h-full' />
      {/* Dark overlay */}
      <div className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm' />

      {/* Register form */}
      <div className='relative z-10 w-full max-w-md px-6 py-8 shadow-xl bg-white/10 rounded-2xl'>
        <h2 className='mb-6 text-3xl font-bold text-center text-white'>Create Account</h2>

        <form onSubmit={handleRegister} className='space-y-4'>
          <div className='flex items-center w-full px-4 py-2 border rounded-full shadow-sm bg-white/20'>
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className='flex-grow text-white placeholder-white bg-transparent outline-none'
            />
          </div>

          <div className='flex items-center w-full px-4 py-2 border rounded-full shadow-sm bg-white/20'>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='flex-grow text-white placeholder-white bg-transparent outline-none'
            />
          </div>

          <div className='flex items-center w-full px-4 py-2 border rounded-full shadow-sm bg-white/20'>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='flex-grow text-white placeholder-white bg-transparent outline-none'
            />
          </div>

          <button type='submit' className='w-full py-3 mt-2 text-white transition bg-blue-600 rounded-full hover:bg-blue-700'>
            Register
          </button>

          <p className='mt-4 text-sm text-center text-gray-300'>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className='font-bold text-white cursor-pointer hover:underline'>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
