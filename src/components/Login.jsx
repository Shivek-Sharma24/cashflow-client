import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [requestSent , SetrequestSent] = useState(false)
  const [Logindata, setLogindata] = useState({
    email: " ",
    password: "",
  });
  function handleChange(e) {
    setLogindata({ ...Logindata, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!Logindata.email || !Logindata.password) {
      toast.error("All fields are required!");
      return;
    }
    console.log("button clicked")
    // console.log(Logindata);
    try {
      SetrequestSent(true)
      let res = await axios.post(
        "https://cash-flow-server.vercel.app/login",
        Logindata
      );

      // console.log(res.data.token);
      localStorage.setItem("token", res.data.token);
      toast.success(`${res.data.message}, wait a sec :)`);
     
      setTimeout(() => {
        window.location.reload("/");
      }, 1000);
    } catch (error) {
      toast.error("Try Again, with right details!");
      console.log("login error", error);
    }
    setLogindata({ email: "", password: "" });
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
        className="w-full min-h-screen flex items-center justify-center bg-zinc-300 px-4 fixed 
      bg-[url(https://img.freepik.com/free-photo/top-view-office-desk-with-growth-chart-coins_23-2148780621.jpg?t=st=1743334561~exp=1743338161~hmac=9fa43822af91625431df44e35ca9546ab63bd92b345e508de2c4f0f48e60e0e6&w=1380)]
      bg-cover
      "
      >
        <div className="w-[70%] p-4 max-w-sm sm:w-[80%] md:w-[50%]   lg:w-[40%] bg-white  sm:px-0 sm:py-4 rounded-2xl shadow-lg">
          <h1 className="text-2xl sm:text-lg font-semibold text-center text-zinc-800 leading-tight">
            Login your Account
          </h1>
          <form>
            <input
              className="block border-2 rounded-lg mt-4 w-[70%] mx-auto px-3 py-1.5 sm:py-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
              type="email"
              name="email"
              placeholder="Email"
              value={Logindata.email}
              onChange={handleChange}
            />
            <input
              className="block border-2 rounded-lg mt-4 w-[70%] mx-auto px-3 py-1.5 sm:py-1 focus:ring-2 focus:ring-red-500 focus:outline-none"
              type="password"
              name="password"
              placeholder="Password"
              value={Logindata.password}
              onChange={handleChange}
            />

            <button
              className="block border-2 rounded-full text-center mx-auto mt-4 w-[70%] px-3 py-2 sm:py-1.5 bg-red-600 text-white font-semibold cursor-pointer transition hover:bg-red-700"
              type="submit"
              onClick={handleSubmit}
              disabled={requestSent}
            >
             {!requestSent? "Login Your Account" : "Loading"}
            </button>

            <p className="mt-4 text-zinc-600 w-[70%] mx-auto font-semibold text-center text-sm sm:text-xs">
              By continuing, you agree to CashFlow's Terms of Service and
              acknowledge that you've read our Privacy Policy.
            </p>
          </form>
          <Link
            to="/signup"
            className="block w-full mt-6 text-center font-semibold text-zinc-800 hover:underline text-sm sm:text-xs"
          >
            Don't have an account? Signup
          </Link>
        </div>
      </div>
    </>
  );
};

export default React.memo(Login);
