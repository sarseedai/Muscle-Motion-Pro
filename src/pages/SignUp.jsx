import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dumbbell, Mail, Lock, User } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Save to localStorage
      localStorage.setItem('userData', JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        joinDate: new Date().toLocaleDateString('default', { month: 'long', year: 'numeric' }), // e.g., July 2025
      }));
      // Optionally auto-login
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col text-left space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-600 rounded-xl">
              <Dumbbell className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-purple-600 select-none">Muscle Motion Pro</h1>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight max-w-md">
            Join us today!
          </h2>
          <p className="text-lg text-gray-600 max-w-md">
            Start your fitness journey and track every rep, set, and milestone.
          </p>
        </div>

        {/* Right side - Sign up form */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 max-w-md mx-auto w-full">
          <h3 className="text-gray-900 text-3xl font-bold mb-2 text-center select-none">Sign Up</h3>
          <p className="text-gray-600 mb-8 text-center">
            Create your account to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-1 text-gray-700 font-medium select-none">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition`}
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-700 font-medium select-none">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-1 text-gray-700 font-medium select-none">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition`}
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-transform duration-200 transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <NavLink
              to="/login"
              className="text-purple-600 hover:text-purple-500 font-semibold hover:underline transition-colors"
            >
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
