import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dumbbell, Mail, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
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
            Welcome Back!
          </h2>
          <p className="text-lg text-gray-600 max-w-md">
            Login to continue your fitness journey and track your progress with ease.
          </p>
        </div>

        {/* Right side - Login form */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 max-w-md mx-auto w-full">
          <h3 className="text-gray-900 text-3xl font-bold mb-2 text-center select-none">Login</h3>
          <p className="text-gray-600 mb-8 text-center">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                />
              </div>
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
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-transform duration-200 transform hover:scale-105"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <NavLink
              to="/signup"
              className="text-purple-600 hover:text-purple-500 font-semibold hover:underline transition-colors"
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
