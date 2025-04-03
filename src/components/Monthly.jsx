import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const MonthlyExpense = () => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`; // Default: current month
  });
  const [totalExpense, setTotalExpense] = useState(0);

  const fetchMonthlyExpense = async () => {
    const token = localStorage.getItem("token"); // Ensure token is stored after login
    if (!token) {
      console.error("No token found");
      return;
    }
    const [year, month] = selectedMonth.split("-"); // Extract year and month

    try {
      const response = await axios.get(
        `https://cash-flow-server.vercel.app/expenses/monthly`,
        {
          params: { month, year },

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalExpense(response.data.totalExpense || 0);
    } catch (error) {
      console.error("Error fetching monthly expenses:", error);
    }
  };

  useEffect(() => {
    fetchMonthlyExpense(); // Fetch when the selected month changes
  }, [selectedMonth]);

  return (
    <div className="md:flex   md:gap-3 flex justify-between items-center">
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="border max-w-[130px] text-center text-black rounded-md md:mx-4 mx-3 mt-2 md:mt-0 max-h-[35px] p-1 opacity-70"
      />

      <h3 className=" mt-1 md:mt-0 mx-3 md:mx-0 ">
        <span className="opacity-50 font-mono text-white">Spent in </span>

        <span className="opacity-70 text-blue-300 font-mono ">
          {new Date(selectedMonth).toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
          {":- "}
        </span>
        <span className="text-red-300 font-mono">${totalExpense}</span>
      </h3>
    </div>
  );
};

export default MonthlyExpense;
