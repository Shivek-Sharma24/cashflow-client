import React from "react";
import axios from "axios";
import { TERipple } from "tw-elements-react";

const SingleCard = ({ item, fetchExpenses, setcatvalue }) => {
  async function handleclick() {
    try {
      const token = localStorage.getItem("token"); // Ensure token is stored after login
      if (!token) {
        console.error("No token found");
        return;
      }
      let res = await axios.delete(
        `https://cash-flow-server.vercel.app/delete/${item._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.assign("/");
      setcatvalue("All");
      fetchExpenses();
      console.log(res.data);
    } catch (error) {
      console.log("error when deleting expense", error);
    }
  }

  const getMonthName = (dateString) => {
    const [year, month, day] = dateString.split("-"); // Extract year and month
    const date = new Date(`${year}-${month}-${day}`); // Convert to Date object
    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
      day: "numeric",
    }); // Format month name
  };
  return (
    <>
      <div className="block rounded-lg max-w-[220px]  md:max-w-[250px] max-h-[300px] bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div className="border-b-2 border-neutral-100 px-4 py-2 font-mono dark:border-neutral-600 dark:text-neutral-50">
          Amount:- <span className="text-red-300">{item.amount}$</span>
        </div>
        <div className="p-6">
          <p className="mb-2 capitalize leading-tight  dark:text-gray-100">
            <span className="font-mono text-sm font-bold">Expense Name:-</span>{" "}
            <span className="capitalize text-sm font-mono opacity-80">
              {item.name}
            </span>
          </p>
          <p className="mb-6 text-base text-sm font-mono font-bold text-neutral-600 dark:text-neutral-200">
            Category :- <span className="opacity-80">{item.category}</span>
          </p>
          <TERipple>
            <button
              onClick={handleclick}
              type="button"
              className="inline-block cursor-pointer rounded bg-red-400 text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              Delete
            </button>
          </TERipple>
        </div>
        <div className="border-t-2 border-neutral-100 px-6 py-2 font-mono opacity-80 dark:border-neutral-600 dark:text-neutral-50">
          {getMonthName(item.date)}
        </div>
      </div>
    </>
  );
};

export default React.memo(SingleCard);
