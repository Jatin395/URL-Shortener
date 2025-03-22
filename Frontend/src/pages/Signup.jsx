import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PATH from '../Utiles/PATH'
import { toast } from 'react-toastify';
import { useAuth } from '../Context/Context'

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: '',
    password: '',
  });

  const { user, auth } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.error("Fill all inputs");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await axios.post(PATH.AUTH.SIGNUP, { name, email, password }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Signup successful");
        navigate('/login');
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    }
  };


  useEffect(() => {
    if (auth || user) {
      navigate('/');
    }
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto w-full p-4">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        <p className="text-center text-sm text-gray-600 mb-6">Create a new account</p>

        {/* Name Field */}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInput}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="jatin sharma"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInput}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@domain.com"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInput}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>


        {/* Submit Button */}
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Sign Up
        </button>

        {/* Already have an account? */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <Link to={'/login'} className="text-blue-600 hover:underline">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
