import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { login } from "../features/auth/authSlice";
import { toast } from "react-toastify";

function LoginForm() {
  const { user,  isSuccess, message, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .max(50, "Max length of email is 50 characters"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
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
    <form className="lg:w-1/2 w-full" onSubmit={formikLogin.handleSubmit}>
      <h3 className="capitalize text-[#c97642] text-center text-3xl font-bold">
        login now
      </h3>
      <div className="flex flex-col w-full">
        <div className="flex justify-center items-center">
          <input
            type="email"
            name="email"
            id="email"
            className="lg:w-[70%] w-full h-10 rounded-md bg-[#272629] py-1 px-2 border-b border-r border-white focus:outline-none text-white my-2"
            value={formikLogin.values.email}
            placeholder="Email"
            onChange={formikLogin.handleChange}
            onBlur={formikLogin.handleBlur}
          />
        </div>
        <div className="flex justify-center items-center">
          <input
            type="password"
            name="password"
            id="password"
            className="lg:w-[70%] w-full h-10 rounded-md bg-[#272629] py-1 px-2 border-b border-r border-white focus:outline-none text-white my-2"
            value={formikLogin.values.password}
            placeholder="Password"
            onChange={formikLogin.handleChange}
            onBlur={formikLogin.handleBlur}
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="lg:w-[70%] w-full h-10 rounded-md] py-1 px-2 bg-[#c97642] text-white my-2 rounded-md"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
