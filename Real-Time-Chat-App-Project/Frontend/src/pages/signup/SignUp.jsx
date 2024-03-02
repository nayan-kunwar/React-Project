import React from "react";
import GenderCheckbox from "./GenderCheckbox.jsx"
const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up
        </h1>

        <form>
          <div>
            <label className="label p-2">
              <span className="text-sm font-medium leading-6 text-gray-900">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered  h-10"
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-sm font-medium leading-6 text-gray-900">Username</span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-sm font-medium leading-6 text-gray-900">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div>
            <label className="label">
              <span className="text-sm font-medium leading-6 text-gray-900">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <GenderCheckbox />

          <a
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 mt-2 inline-block"
            href="#"
          >
            Already have an account?
          </a>

          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
