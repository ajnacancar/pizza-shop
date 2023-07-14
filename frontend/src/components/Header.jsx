import React, { useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaShoppingCart } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import Categories from "./Categories";
import Search from "./Search";

function Header() {
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClick = () => {
    return setShow(!show);
  };

  const onLogOut = () => {
    dispatch(logout());
    dispatch(reset());
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <Link to={"/"} className="flex items-center space-x-3">
          <GiKnifeFork size={40} color="white" />

          <h1 className="text-white font-Lobster-Two text-5xl italic">Pizza</h1>
        </Link>

        <AiOutlineMenu
          onClick={handleClick}
          className="text-white cursor-pointer flex lg:hidden"
          size={40}
        />

        <div className="w-1/5 lg:flex justify-between items-center hidden ">
          <Link className="text-white font-Lobster-Two text-3xl" to={"/about"}>
            About
          </Link>
          <Link to={"/cart"}>
            <FaShoppingCart size={30} color="white" />
          </Link>

          {user && user.id ? (
            <>
              <Link
                className="text-white font-Lobster-Two text-3xl"
                to={"/orders"}
              >
                Orders
              </Link>
              <Link to={"/"} onClick={() => onLogOut()}>
                <FaSignOutAlt size={30} color="white" />
              </Link>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <IoMdPerson size={30} color="white" />
              </Link>
            </>
          )}
        </div>
      </div>

      {show && (
        <div className="flex flex-col justify-between items-center space-y-5 my-2">
          <Link
            className="text-white font-Lobster-Two text-3xl border-b border-b-gray-400 w-full text-center pb-2"
            to={"/about"}
          >
            About
          </Link>
          <Link
            className="border-b border-b-gray-400 w-full flex justify-center items-center pb-2"
            to={"/cart"}
          >
            <FaShoppingCart size={30} color="white" />
          </Link>

          <>
            {user && user.id ? (
              <>
                <Link
                  className="text-white font-Lobster-Two text-3xl border-b border-b-gray-400 w-full text-center pb-2"
                  to={"/orders"}
                >
                  Orders
                </Link>
                <Link
                  className="border-b border-b-gray-400 w-full flex justify-center items-center pb-2"
                  to={"/"}
                  onClick={() => onLogOut()}
                >
                  <FaSignOutAlt size={30} color="white" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="border-b border-b-gray-400 w-full flex justify-center items-center pb-2"
                  to={"/login"}
                >
                  <IoMdPerson size={30} color="white" />
                </Link>
              </>
            )}
          </>
        </div>
      )}

      <Search />
      <Categories />
    </>
  );
}

export default Header;
