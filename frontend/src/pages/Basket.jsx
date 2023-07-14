import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearCart,
  getTotal,
  removeItemFromCart,
} from "../features/basket/basketSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { reset } from "../features/order/orderSlice";

function Basket() {
  const { items, basketTotalAmount } = useSelector((state) => state.basket);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (item) => {
    dispatch(removeItemFromCart(item));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  const handleClick = () => {
    if (user) {
      dispatch(reset());
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch]);
  return (
    <div className="min-h-screen flex flex-col bg-[#272629] py-10 lg:px-20 px-5">
      <Header />
      <div className="my-20">
        <div className="w-full">
          <h1 className="text-4xl text-[#c97642] capitalize font-bold text-center mb-10">
            Basket
          </h1>

          <div className="w-full md:flex md:justify-center">
            <div className="lg:w-1/2">
              {items && items.length > 0 ? (
                <div className="my-10">
                  <div className="w-full grid md:grid-cols-6 grid-cols-1">
                    <div className="md:col-span-3 hidden md:flex py-2 border-b border-b-gray-400">
                      <h3 className="text-white uppercase text-lg ">Pizza</h3>
                    </div>

                    <div className="md:col-span-1 hidden md:flex py-2 border-b border-b-gray-400">
                      <h3 className="text-white uppercase text-lg ">Price</h3>
                    </div>

                    <div className="md:col-span-1 hidden md:flex py-2 border-b border-b-gray-400">
                      <h3 className="text-white uppercase text-lg ">
                        Quantity
                      </h3>
                    </div>

                    <div className="md:col-span-1 hidden py-2 md:flex justify-end border-b border-b-gray-400">
                      <h3 className="text-white uppercase text-lg ">Total</h3>
                    </div>

                    {items &&
                      items.map((item, index) => (
                        <>
                          <div className="md:col-span-3 col-span-1 py-2 md:border-b border-b-gray-400">
                            <div className="flex space-x-2">
                              <img
                                src={item.picture_link}
                                alt=""
                                className="rounded-md w-36 h-full"
                              />

                              <div>
                                <h2 className="text-white text-lg">
                                  {item.name}
                                </h2>
                                <h2 className="text-white text-lg">
                                  Size: {item.size}
                                </h2>
                                <h2
                                  onClick={() => handleRemove(item)}
                                  className="text-gray-400 text-lg cursor-pointer hover:text-[#c97642]"
                                >
                                  Remove
                                </h2>
                              </div>
                            </div>
                          </div>

                          <div className="col-span-1 py-2 flex md:justify-start justify-between md:border-b border-b-gray-400">
                          <h3 className="text-white md:hidden uppercase text-lg ">Price</h3>
                            <div className="h-full flex items-center">
                              <h4 className="text-white font-bold text-xl">
                                ${item.priceSize}
                              </h4>
                            </div>
                          </div>

                          <div className="col-span-1 py-2 flex md:justify-start justify-between md:border-b border-b-gray-400">
                          <h3 className="text-white md:hidden uppercase text-lg ">Quantity</h3>
                            <div className="h-full flex items-center">
                              <h4 className="text-white font-bold text-xl">
                                {item.quantity}
                              </h4>
                            </div>
                          </div>

                          <div className="col-span-1 py-2 flex md:justify-end justify-between border-b border-b-gray-400">
                          <h3 className="text-white md:hidden uppercase text-lg ">Total</h3>
                            <div className="w-full h-full flex items-center justify-end">
                              <h4 className="text-white font-bold text-xl">
                                ${item.pizzaPrice}
                              </h4>
                            </div>
                          </div>
                        </>
                      ))}
                  </div>

                  <div className="w-full flex justify-between items-start my-5">
                    <div>
                      <button
                        onClick={handleClear}
                        className="w-32 h-10 text-white capitalize bg-transparent border border-gray-400 rounded-md"
                      >
                        Clear Cart
                      </button>
                    </div>

                    <div className="space-y-3 lg:w-1/3">
                      <div className="flex justify-between items-center">
                        <h2 className="text-[#c97642] text-xl font-bold">
                          Subtotal:
                        </h2>
                        <h2 className="text-[#c97642] text-xl font-bold">
                          ${basketTotalAmount}
                        </h2>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Shipping calculated at checkout.
                      </p>

                      <button
                        onClick={handleClick}
                        className="w-full h-10 rounded-md text-xl text-white bg-[#c97642]"
                      >
                        Checkout
                      </button>

                      <Link
                        to={"/"}
                        className="flex items-center cursor-pointer"
                      >
                        <AiOutlineArrowLeft
                          className="text-gray-400"
                          size={20}
                        />
                        <p className="text-lg text-gray-400">
                          Continue with pizza
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-center">
                  <div>
                  <h1 className="text-white text-xl">Your cart is empty</h1>
                  <Link to={"/"} className="w-full flex items-center justify-center cursor-pointer">
                    <AiOutlineArrowLeft className="text-gray-400" size={20} />
                    <p className="text-lg text-gray-400">See all pizzas</p>
                  </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Basket;
