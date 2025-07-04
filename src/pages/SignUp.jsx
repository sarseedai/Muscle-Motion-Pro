import React from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row items-center gap-12 bg-white rounded-3xl shadow-2xl p-8">
        <div className="w-40 md:w-60">
        
          <Header/>
        </div>
        
        <div className="w-full max-w-md p-8 shadow-lg">
          <div className="bg-whites rounded-2xl ">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Sign Up</h1>
            </div>
            <form className="space-y-4" onSubmit={()=> navigate('/')}>
              <CustomInput name="name" type="text" id="name" label="Name" />
              <CustomInput name="email" type="text" id="email" label="Email" />
              <CustomInput name="mobile" type="tel" id="mobile" label="Mobile" />
              <CustomInput
                name="password"
                type="password"
                id="password"
                label="Password"
              />
              
              <CustomButton label="Sign Up" type="submit" />
            </form>
            <p className="text-md text-center text-gray-800 mt-6">
              Already have an account?{" "}
              <NavLink to="/login" className="text-blue-600 hover:underline">
                Log in
              </NavLink>
            </p>
          </div>
      </div>
    </div>
  );
};

export default SignUp;
