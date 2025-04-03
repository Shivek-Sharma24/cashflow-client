import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const [username, setusername] = useState("");
  let token = localStorage.getItem("token");

  async function fetch() {
    try {
      let res = await axios.get(
        "https://cash-flow-server.vercel.app/username",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setusername(res.data);
      console.log(username);
    } catch (error) {
      console.log("error when fetch username", error);
    }
  }
  fetch();

  function handleLogout() {
    localStorage.clear();
    toast.success("Logout Successfully! , wait a sec...");
    setTimeout(() => {
      window.location.assign("/");
    }, 2000);
  }

  return (
    <>
      <div className="w-100% bg-slate-500 h-[55px] text-white flex justify-between items-center ">
        <div className="flex p-2 gap-1 mx-2">
          <img
            // src="../public/expenseLogo.png"
            src="https://img.freepik.com/free-vector/hand-drawn-money-logo-design_23-2150931754.jpg?t=st=1743699875~exp=1743703475~hmac=67102888923382ce06ff54a81081d13612bd45e2826769efb743876372636db0&w=826"
            alt=""
            className="w-[27px] h-[27px] "
          />
          <p className=" text-xl font-serif uppercase opacity-70">
            Cash<span className="text-green-300 ">Flow</span>
          </p>
        </div>
        {token ? (
          <>
            <p className="mx-auto capitalize font-bold font-serif opacity-70">
              {username}
            </p>
            <button
              className="w-[60px] h-[35px] p-1 rounded-md text-white text-center bg-red-600 text-sm m-4 text-opacity-90 hover:bg-red-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <p className="m-4 text-cyan-300 opacity-60 font-bold font-mono flex gap-2">
            Let's Sign in to use{"  "}
          </p>
        )}
      </div>
    </>
  );
};

export default Navbar;
