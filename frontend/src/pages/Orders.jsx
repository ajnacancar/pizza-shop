import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getOrdersForUser } from "../features/order/orderSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import moment from "moment/moment";

function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.order);
  const handleClick = (id) => {
    navigate(`/orders/${id}`);
  };

  useEffect(() => {
    dispatch(getOrdersForUser());
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-[#272629] py-10 lg:px-20 px-5">
      <Header />
      <div className="my-20">
        <div className="w-full">
          <h1 className="text-4xl text-[#c97642] capitalize font-bold text-center mb-10">
            Orders
          </h1>

          <div className="w-full md:flex md:justify-center">
            <div className="lg:w-1/2">
              {orders && orders.length > 0 ? (
                <div className="my-10">
                  <div className="w-full grid md:grid-cols-5 grid-cols-1">
                    <div className="md:col-span-1 hidden md:flex py-2 border-b border-b-gray-400">
                      <h3 className="text-white uppercase text-lg ">
                        Order Id
                      </h3>
                    </div>

                    <div className="md:col-span-1 hidden md:flex py-2 border-b border-b-gray-400">
                      <h3 className="text-white uppercase text-lg ">
                        Order Status
                      </h3>
                    </div>

                    <div className="md:col-span-1 hidden md:flex py-2 border-b border-b-gray-400">
                      <h3 className="text-white uppercase text-lg ">
                        Amount Price
                      </h3>
                    </div>

                    <div className="md:col-span-1 hidden py-2 md:flex justify-end border-b border-b-gray-400">
                      <h3 className="text-white uppercase text-lg ">
                        Order Date
                      </h3>
                    </div>

                    <div className="md:col-span-1 hidden py-2 md:flex justify-end border-b border-b-gray-400">
                      <h3 className="text-white uppercase text-lg ">
                        See details
                      </h3>
                    </div>

                    {orders &&
                      orders.map((item, index) => (
                        <>
                          <div className="col-span-1 py-2 flex md:justify-start justify-between md:border-b border-b-gray-400">
                            <h3 className="text-white md:hidden uppercase text-lg ">
                              Order Id
                            </h3>
                            <div className="h-full flex items-center">
                              <h4 className="text-white font-bold text-xl">
                                {item.id}
                              </h4>
                            </div>
                          </div>

                          <div className="col-span-1 py-2 flex md:justify-start justify-between md:border-b border-b-gray-400">
                            <h3 className="text-white md:hidden uppercase text-lg ">
                              Order Status
                            </h3>
                            <div className="h-full flex items-center">
                              <h4 className="text-white font-bold text-xl">
                                {item.status}
                              </h4>
                            </div>
                          </div>

                          <div className="col-span-1 py-2 flex md:justify-start justify-between md:border-b border-b-gray-400">
                            <h3 className="text-white md:hidden uppercase text-lg ">
                              Amount Price
                            </h3>
                            <div className="h-full flex items-center">
                              <h4 className="text-white font-bold text-xl">
                                {item.price_currency} {item.price_amount}
                              </h4>
                            </div>
                          </div>

                          <div className="col-span-1 py-2 flex md:justify-end justify-between md:border-b border-b-gray-400">
                            <h3 className="text-white md:hidden uppercase text-lg ">
                              Order Date
                            </h3>
                            <div className="w-full h-full flex items-center justify-end">
                              <h4 className="text-white font-bold text-xl">
                                {moment().format("DD/MM/YYYY", item.order_date)}
                              </h4>
                            </div>
                          </div>

                          <div className="col-span-1 py-2 flex md:justify-end justify-between border-b border-b-gray-400">
                            <h3 className="text-white md:hidden uppercase text-lg ">
                              Details
                            </h3>
                            <div className="w-full h-full flex items-center justify-end">
                              <button
                                onClick={() => handleClick(item.id)}
                                className="w-1/2 h-10 rounded-md text-xl text-white bg-[#c97642]"
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-center">
                  <div>
                    <h1 className="text-white text-xl">
                      You don't have orders yet!
                    </h1>
                    <Link
                      to={"/"}
                      className="w-full flex items-center justify-center cursor-pointer"
                    >
                      <AiOutlineArrowLeft className="text-gray-400" size={20} />
                      <p className="text-lg text-gray-400">
                        See all pizzas & make order.
                      </p>
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

export default Orders;
