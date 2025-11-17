import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import { useNavigate } from "react-router-dom";

const Totalexpense = ({ catvalue, setcatvalue }) => {
  let [expense, setexpense] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if (catvalue === "All") {
      fetchExpenses();
    } else {
      fetchdata(catvalue);
    }
  }, [catvalue]); // Runs when catvalue changes

  const fetchExpenses = async () => {
    const token = localStorage.getItem("token"); // Ensure token is stored after login
    if (!token) {
      console.error("No token found");
      return;
    }
    try {
      const response = await axios.get(
        `https://cash-flow-server.vercel.app/getall/expenses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response.data);
      if (response.data === "Empty expenses") {
        navigate("/addExpense");
      } else {
        setexpense(response.data);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  async function fetchdata(category) {
    const token = localStorage.getItem("token"); // Ensure token is stored after login
    if (!token) {
      console.error("No token found");
      return;
    }
    let res = await axios.get(
      `https://cash-flow-server.vercel.app/category/${category}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let data = res.data;
    setexpense(data);
  }

  // let result = expense.reduce((sum, item) => sum + item.amount, 0);

  return (
    <>
      <div className="flex flex-wrap  gap-3 md:flex md:gap-2 md:flex-wrap">
        {expense.length > 0 ? (
          expense.map((item) => (
            <SingleCard
              setcatvalue={setcatvalue}
              item={item}
              key={item._id}
              fetchExpenses={fetchExpenses}
            />
          ))
        ) : (
          <h1 className=" mt-2 text-xl">NO EXPENSE FOUND </h1>
        )}
      </div>
    </>
  );
};

export default Totalexpense;
