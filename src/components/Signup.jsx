import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [requestSent , SetrequestSent] = useState(false)
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formdata.username || !formdata.email || !formdata.password) {
      toast.error("All fields are required!");
      return;
    }

    // console.log(formdata);
    try {
      SetrequestSent(true)
      let res = await axios.post(
        "https://cash-flow-server.vercel.app/create",
        formdata
      );
      toast.success("Register Successfully");
      localStorage.setItem("token", res.data.token);

      setTimeout(() => {
        window.location.reload("/");
      }, 2000);
    } catch (error) {
      toast.error("Try Again, with right crediantials!");
      console.log("Signup error", error);
    }
    setformdata({ username: "", email: "", password: "" });
    SetrequestSent(false)

  }

  let token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);
  return (
    <>
      <div
        className="w-full h-[100vh] flex items-center justify-center bg-zinc-300 px-4 
         fixed bg-[url(https://img.freepik.com/free-photo/top-view-office-desk-with-growth-chart-coins_23-2148780621.jpg?t=st=1743334561~exp=1743338161~hmac=9fa43822af91625431df44e35ca9546ab63bd92b345e508de2c4f0f48e60e0e6&w=1380)]
      bg-cover "
      >
        <div className="w-[70%] p-4 max-w-sm sm:w-[80%] md:w-[50%]  lg:w-[40%] bg-white  sm:px-0 sm:py-4 rounded-2xl shadow-lg">
          <h1 className="text-2xl sm:text-lg font-semibold text-center text-zinc-800 leading-tight">
            Create New Account
          </h1>
          <form>
            <input
              className="block border-2 rounded-lg mt-4 w-[70%] mx-auto px-1 py-1.5 sm:py-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={formdata.username}
            />
            <input
              className="block border-2 rounded-lg mt-4 w-[70%] mx-auto px-3 py-1.5 sm:py-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formdata.email}
            />
            <input
              className="block border-2 rounded-lg mt-4 w-[70%] mx-auto px-3 py-1.5 sm:py-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formdata.password}
            />

            <button
              className="block border-2 rounded-full text-center mx-auto mt-4 w-[70%] px-3 py-2 sm:py-1.5 bg-red-600 text-white font-semibold cursor-pointer transition hover:bg-red-700"
              type="submit"
              onClick={handleSubmit}
              disabled={requestSent}
            >
              {!requestSent ? "Register Your Account" : "Loading"}
            </button>

            <p className="mt-4 text-zinc-600 w-[70%] mx-auto font-semibold text-center text-sm sm:text-xs">
              By continuing, you agree to CashFlow's Terms of Service and
              acknowledge that you've read our Privacy Policy.
            </p>
          </form>
          <Link
            to="/login"
            className="block w-full mt-6 text-center font-semibold text-zinc-800 hover:underline text-sm sm:text-xs"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default React.memo(Signup);
