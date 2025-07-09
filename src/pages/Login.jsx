import React from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen items-center justify-center">
      <div>hello left side code here </div>
    <div className="flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row items-center gap-12 bg-white rounded-3xl shadow-2xl p-8">
        <div className="w-40 md:w-60">
        
          <Header/>
        </div>
        <div className="w-full max-w-md">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Login</h1>
        <form className="space-y-5" onSubmit={()=> navigate('/')}>
          <CustomInput
            name="username"
            type="text"
            id="username"
            label="Email"
          />
          <CustomInput
            name="password"
            type="password"
            id="password"
            label="Password"
          />
          <CustomButton label="Login" type="submit" />
        </form>
        <p className="text-md text-center text-gray-700 mt-6">
          Don't have an account?{' '}
          <NavLink to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
    </div>
      </div>
    </div>
  );
};

export default Login;
