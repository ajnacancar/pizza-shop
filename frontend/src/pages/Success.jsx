import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Success() {
  return (
    <div className="min-h-screen flex flex-col bg-[#272629] py-10 lg:px-20 px-5">
      <Header />
      <div className="mb-20"></div>
      <div className="w-full flex justify-center items-center">
        <div className="space-y-10">
        <div className="w-full flex justify-center">
          <AiFillCheckCircle size={70} color="#c97642" />
        </div>

        <div className="text-white text-center text-3xl font-Lobster-Two">
          <p>Your order is created. We will dilliver your pizzas in 30min.</p>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Success;
