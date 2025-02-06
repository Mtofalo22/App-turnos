import React from "react";
import BookingForm from "./components/BookingForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <BookingForm />
    </>
  );
}

export default App;
