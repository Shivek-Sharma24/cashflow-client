import React, { useState } from "react";
import { Link } from "react-router-dom";
import Totalexpense from "./Totalexpense";
import MonthlyExpense from "./Monthly";

const Home = () => {
  const [catvalue, setcatvalue] = useState("All");
  function handleChange(e) {
    setcatvalue(e.target.value);
  }

  return (
    <>
      <div className="w-100% bg-slate-700 md:h-[55px] max-h-[220px]  block  text-white md:flex md:justify-between items-center">
        <div className="  ">
          <MonthlyExpense />
        </div>

        <div className=" md:flex flex justify-between">
          <select
            name="category"
            value={catvalue}
            onChange={handleChange}
            className="h-[30px] text-white w-[130px] opacity-50 bg-slate-600 m-3 rounded-md border cursor-pointer"
          >
            <option value="All">All</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>

          <p
            className="max-w-[90px] bg-indigo-500 h-[35px]
           text-white text-sm p-2 md:py-1.5 m-2.5 text-center font-mono rounded-md hover:bg-indigo-400 transition duration-300"
          >
            <Link to={"/addExpense"}>AddNew</Link>
          </p>
        </div>
        {/* parent div  */}
      </div>
      <div className="m-2 min-w-screen min-h-100vh block gap-2 md:flex md:gap-2">
        <Totalexpense catvalue={catvalue} setcatvalue={setcatvalue} />
      </div>
    </>
  );
};

export default React.memo(Home);
