import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
// import { supabase } from "../supabaseClient";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);
  const { SignInUser } = UserAuth();

  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    setloading(true);

    try {
      const result = await SignInUser(email, password);

      if (result.success) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("an error ocurred ", err);
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignin} className="max-w-md m-auto pt-24">
        <h2 className="font-bold pd-2 ">sign up</h2>
        <p>
          Don't have an account?{" "}
          <Link
            className="text-blue-600 hover:cursor-pointer hover:font-bold transition-all duration-75"
            to="/signup"
          >
            sign Up!
          </Link>
        </p>
        <div className="flex flex-col py-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="p-3 mt-4 border rounded-2xl text-black focus:outline-none "
            placeholder="Your@gmail.com"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="p-3 mt-4 border rounded-2xl text-black focus:outline-none "
            placeholder="Your password here"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full border p-4 rounded-2xl hover:-translate-y-0.5 hover:cursor-pointer hover:shadow-2xl shadow-black/75 transition-all  duration-500 "
          >
            Sign in
          </button>

          {error && <p className="text-red-600 text-center pt-4">{error}</p>}
        </div>
      </form>
    </div>
  );
};
