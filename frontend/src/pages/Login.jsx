import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-[#272629] py-10 lg:px-20 px-5">
      <Header />
      <div className="my-20 w-full">
        <div className="flex justify-center items-center w-full">
          <div className="lg:w-[70%] w-full lg:flex justify-between items-start">
            <LoginForm />
            <RegisterForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
