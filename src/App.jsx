import "./App.css";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import ExpenseTracker from "./components/Expense";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Navigate } from "react-router-dom";
import NotFound from "./components/Notfound";
import React from "react";

function App() {
  let token = localStorage.getItem("token");

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />}></Route> */}
        {/* <Route path="/" element={!token ? <Signup /> : <Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/addExpense" element={<ExpenseTracker />} /> */}

        {/* Redirect to Home if logged in, otherwise show Signup */}
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={token ? <Home /> : <Login />} />

        {/* Redirect to Home if logged in, otherwise show Login */}
        <Route
          path="/"
          element={token ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/" replace /> : <Signup />}
        />

        {/* Protected route: Only logged-in users can access */}
        <Route
          path="/addExpense"
          element={
            token ? <ExpenseTracker /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </>
  );
}

export default React.memo(App);
