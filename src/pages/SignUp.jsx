import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dumbbell, Mail, Phone, User, Lock } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/xtdashboard');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <div className="text-center lg:text-left space-y-8">
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div className="p-3 bg-purple-600 rounded-xl">
              <Dumbbell className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-purple-600 select-none">Muscle Motion Pro</h1>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Start Your Fitness Journey Today
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
            Join thousands of users who are transforming their bodies and achieving their fitness goals with our comprehensive tracking platform.
          </p>

          <div className="space-y-4 max-w-md mx-auto lg:mx-0 text-gray-700">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-purple-600 rounded-full inline-block" />
              Track your workouts and progress
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-purple-600 rounded-full inline-block" />
              Set and achieve your fitness goals
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-purple-600 rounded-full inline-block" />
              Monitor your body metrics
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 max-w-md mx-auto w-full">
          <h3 className="text-gray-900 text-3xl font-bold mb-2 text-center select-none">Create Account</h3>
          <p className="text-gray-600 mb-8 text-center">Enter your details to get started</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-1 text-gray-700 font-medium select-none">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-gray-700 font-medium select-none">
                Email Address
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

            <div>
              <label htmlFor="phone" className="block mb-1 text-gray-700 font-medium select-none">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="Enter your phone number"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-transform duration-200 transform hover:scale-105"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <NavLink
              to="/login"
              className="text-purple-600 hover:text-purple-500 font-semibold hover:underline transition-colors"
            >
              Log In
            </NavLink>
          </p>

          <p className="mt-6 pt-6 text-xs text-gray-400 text-center border-t border-gray-200 select-none">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
