import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../features/order/orderSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";

function OrderDetails() {
  const { order } = useSelector((state) => state.order);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [id]);

  console.log(order);
  return (
    <div className="min-h-screen flex flex-col bg-[#272629] py-10 lg:px-20 px-5">
      <Header />
      <div className="my-20">
        <div className="w-full">
          <h1 className="text-4xl text-[#c97642] capitalize font-bold text-center mb-10">
            Order Details
          </h1>

          <div className="w-full md:flex md:justify-center">
            <div className="lg:w-1/2">
              {order && order.line_items && order.line_items.length > 0 && (
                <div className="my-10">
                  <div className="w-full grid md:grid-cols-6 grid-cols-1">
                    <div className="md:col-span-3 hidden md:flex py-2 border-b border-b-gray-400">
                      <h3 className="text-white uppercase text-lg ">Pizza</h3>
                    </div>

                    <div className="md:col-span-1 hidden md:flex py-2 border-b border-b-gray-400">
                      <h3 className="text-white uppercase text-lg ">
                        Unit Price
                      </h3>
                    </div>

                    <div className="md:col-span-1 hidden md:flex py-2 border-b border-b-gray-400">
                      <h3 className="text-white uppercase text-lg ">
                        Quantity
                      </h3>
                    </div>

                    <div className="md:col-span-1 hidden py-2 md:flex justify-end border-b border-b-gray-400">
                      <h3 className="text-white uppercase text-lg ">Total</h3>
                    </div>

                    {order &&
                      order.line_items.map((item, index) => (
                        <>
                          <div className="md:col-span-3 col-span-1 py-2 md:border-b border-b-gray-400">
                            <div className="flex space-x-2">
                              <img
                                src={item.pizza.picture_link}
                                alt=""
                                className="rounded-md w-36 h-full"
                              />

                              <div>
                                <h2 className="text-white text-lg">
                                  {item.pizza.name}
                                </h2>
                                {/* <h2 className="text-white text-lg">
                                  Size: {item.size}
                                </h2> */}
                              </div>
                            </div>
                          </div>

                          <div className="col-span-1 py-2 flex md:justify-start justify-between md:border-b border-b-gray-400">
                            <h3 className="text-white md:hidden uppercase text-lg ">
                              Price
                            </h3>
                            <div className="h-full flex items-center">
                              <h4 className="text-white font-bold text-xl">
                                ${item.unit_price_amount}
                              </h4>
                            </div>
                          </div>

                          <div className="col-span-1 py-2 flex md:justify-start justify-between md:border-b border-b-gray-400">
                            <h3 className="text-white md:hidden uppercase text-lg ">
                              Quantity
                            </h3>
                            <div className="h-full flex items-center">
                              <h4 className="text-white font-bold text-xl">
                                {item.quantity}
                              </h4>
                            </div>
                          </div>

                          <div className="col-span-1 py-2 flex md:justify-end justify-between border-b border-b-gray-400">
                            <h3 className="text-white md:hidden uppercase text-lg ">
                              Total
                            </h3>
                            <div className="w-full h-full flex items-center justify-end">
                              <h4 className="text-white font-bold text-xl">
                                ${item.total_line_amount}
                              </h4>
                            </div>
                          </div>
                        </>
                      ))}

                    <div className="md:col-span-6 col-span-1 py-2 flex  justify-between border-b border-b-gray-400">
                      <h3 className="text-[#c97642] uppercase text-lg font-bold">
                        Total Order Price
                      </h3>
                      <div className="w-full h-full flex items-center justify-end">
                        <h4 className="text-[#c97642] font-bold text-xl">
                          ${order.order.price_amount}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {order && order.order && (
                <div className="w-full my-10">
                  <div className="w-full flex justify-between items-center my-2">
                    <h4 className="text-white font-bold capitalize text-2xl">
                      Customer:
                    </h4>
                    <p className="text-white text-xl">
                      {order.order.user.last_name} {order.order.user.first_name}
                    </p>
                  </div>


                  <div className="w-full flex justify-between items-center my-2">
                    <h4 className="text-white font-bold capitalize text-2xl">
                      Email:
                    </h4>
                    <p className="text-white  text-xl">
                      {order.order.user.email} 
                    </p>
                  </div>


                  <div className="w-full flex justify-between items-center my-2">
                    <h4 className="text-white font-bold capitalize text-2xl">
                      Address:
                    </h4>
                    <p className="text-white  text-xl">
                      {order.order.shipping_street}, {order.order.shipping_city}
                    </p>
                  </div>


                  <div className="w-full flex justify-between items-center my-2">
                    <h4 className="text-white font-bold capitalize text-2xl">
                      Special Instructions:
                    </h4>
                    <p className="text-white  text-xl">
                       {order.order.special_instructions}
                    </p>
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

export default OrderDetails;
