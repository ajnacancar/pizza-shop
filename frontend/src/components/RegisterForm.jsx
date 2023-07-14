import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {  register } from "../features/auth/authSlice";
import { toast } from "react-toastify";

function RegisterForm() {
    const { user,  isSuccess, message, error } = useSelector(
        (state) => state.auth
      );
      const dispatch = useDispatch();
      const navigate = useNavigate();



    const formikRegister = useFormik({
        initialValues: {
          email: "",
          password: "",
          first_name: "",
          last_name: "",
          username: "",
        },
        validationSchema: Yup.object({
          email: Yup.string()
            .required("Required")
            .max(50, "Max length of email is 50 characters"),
          password: Yup.string().required("Required"),
          first_name: Yup.string().required("Required"),
          last_name: Yup.string().required("Required"),
          username: Yup.string().required("Required"),
        }),
        onSubmit: (values) => {
          dispatch(register(values));
        },
      });


      useEffect(() => {
        if (error) {
          toast.error(message);
        }
    
        if (user && user.error) {
          toast.error(user.error);
        }
    
        if (isSuccess && user && user.token) {
          navigate("/");
        }
    
        // dispatch(reset())
      }, [error, isSuccess, user, message, navigate, dispatch]);
  return (
    <form
    className="lg:w-1/2 w-full"
    onSubmit={formikRegister.handleSubmit}
  >
    <h3 className="capitalize text-[#c97642] text-center text-3xl font-bold">
      register now
    </h3>

    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          className="lg:w-[70%] w-full h-10 rounded-md bg-[#272629] py-1 px-2 border-b border-r border-white focus:outline-none text-white my-2"
          value={formikRegister.values.first_name}
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
        />
      </div>
      <div className="flex justify-center items-center">
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          className="lg:w-[70%] w-full h-10 rounded-md bg-[#272629] py-1 px-2 border-b border-r border-white focus:outline-none text-white my-2"
          value={formikRegister.values.last_name}
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
        />
      </div>

      <div className="flex justify-center items-center">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="lg:w-[70%] w-full h-10 rounded-md bg-[#272629] py-1 px-2 border-b border-r border-white focus:outline-none text-white my-2"
          value={formikRegister.values.username}
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
        />
      </div>
      <div className="flex justify-center items-center">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="lg:w-[70%] w-full h-10 rounded-md bg-[#272629] py-1 px-2 border-b border-r border-white focus:outline-none text-white my-2"
          value={formikRegister.values.email}
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
        />
      </div>
      <div className="flex justify-center items-center">
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="lg:w-[70%] w-full h-10 rounded-md bg-[#272629] py-1 px-2 border-b border-r border-white focus:outline-none text-white my-2"
          value={formikRegister.values.password}
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
        />
      </div>
      <div className="flex justify-center items-center">
        <input
          type="password"
          className="lg:w-[70%] w-full h-10 rounded-md bg-[#272629] py-1 px-2 border-b border-r border-white focus:outline-none text-white my-2"
          name="cpass"
          required
          placeholder="Confirm password"
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="lg:w-[70%] w-full h-10 rounded-md] py-1 px-2 bg-[#c97642] text-white my-2 rounded-md"
        >
          Register
        </button>
      </div>
    </div>
  </form>

  )
}

export default RegisterForm