import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getOrderById } from "../../features/order/orderSlice";
import Sidebar from "../../components/admin/Sidebar";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AdminOrderDetails() {
  const { order } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getOrderById({id, is_admin:true}));
  }, [dispatch, id]);

  return (
    <div className="w-full flex lg:flex-row flex-col">
    <Sidebar />
    <div className="w-full p-5 lg:p-10">
        <div className="w-full flex justify-end"> 
        <NavLink    to={"/admin/orders"} className="bg-black text-white p-2">
            <div className="flex items-center justify-between">
                <AiOutlineArrowLeft size={25} />
                <p className="capitalize text-xl">Go to Orders</p>
            </div>
      </NavLink>
        </div>
       <h1 className="text-center text-2xl font-bold">Order Details:{order && order.order && <> #{order.order.id} </>}</h1>

     
     <div className="w-full md:flex md:justify-center">
            <div className="lg:w-1/2">
              {order && order.line_items && order.line_items.length > 0 && (
                <div className="my-10">
                  <div className="w-full grid md:grid-cols-6 grid-cols-1">
                    <div className="md:col-span-3 hidden md:flex py-2 border-b border-b-gray-400">
                      <h3 className="text-gray-400 uppercase text-lg ">Pizza</h3>
                    </div>

                    <div className="md:col-span-1 hidden md:flex py-2 border-b border-b-gray-400">
                      <h3 className="text-gray-400 uppercase text-lg ">
                        Unit Price
                      </h3>
                    </div>

                    <div className="md:col-span-1 hidden md:flex py-2 border-b border-b-gray-400">
                      <h3 className="text-gray-400 uppercase text-lg ">
                        Quantity
                      </h3>
                    </div>

                    <div className="md:col-span-1 hidden py-2 md:flex justify-end border-b border-b-gray-400">
                      <h3 className="text-gray-400 uppercase text-lg ">Total</h3>
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
                                <h2 className="text-gray-400 text-lg">
                                  {item.pizza.name}
                                </h2>
                              </div>
                            </div>
                          </div>

                          <div className="col-span-1 py-2 flex md:justify-start justify-between md:border-b border-b-gray-400">
                            <h3 className="text-gray-400 md:hidden uppercase text-lg ">
                              Price
                            </h3>
                            <div className="h-full flex items-center">
                              <h4 className="text-gray-400 font-bold text-xl">
                                ${item.unit_price_amount}
                              </h4>
                            </div>
                          </div>

                          <div className="col-span-1 py-2 flex md:justify-start justify-between md:border-b border-b-gray-400">
                            <h3 className="text-gray-400 md:hidden uppercase text-lg ">
                              Quantity
                            </h3>
                            <div className="h-full flex items-center">
                              <h4 className="text-gray-400 font-bold text-xl">
                                {item.quantity}
                              </h4>
                            </div>
                          </div>

                          <div className="col-span-1 py-2 flex md:justify-end justify-between border-b border-b-gray-400">
                            <h3 className="text-gray-400 md:hidden uppercase text-lg ">
                              Total
                            </h3>
                            <div className="w-full h-full flex items-center justify-end">
                              <h4 className="text-gray-400 font-bold text-xl">
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
                    <h4 className="text-gray-400 font-bold capitalize text-2xl">
                      Customer:
                    </h4>
                    <p className="text-gray-400 text-xl">
                      {order.order.user.last_name} {order.order.user.first_name}
                    </p>
                  </div>


                  <div className="w-full flex justify-between items-center my-2">
                    <h4 className="text-gray-400 font-bold capitalize text-2xl">
                      Email:
                    </h4>
                    <p className="text-gray-400  text-xl">
                      {order.order.user.email} 
                    </p>
                  </div>


                  <div className="w-full flex justify-between items-center my-2">
                    <h4 className="text-gray-400 font-bold capitalize text-2xl">
                      Address:
                    </h4>
                    <p className="text-gray-400  text-xl">
                      {order.order.shipping_street}, {order.order.shipping_city}
                    </p>
                  </div>


                  <div className="w-full flex justify-between items-center my-2">
                    <h4 className="text-gray-400 font-bold capitalize text-2xl">
                      Special Instructions:
                    </h4>
                    <p className="text-gray-400  text-xl">
                       {order.order.special_instructions}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
    </div>
    </div>
  )
}

export default AdminOrderDetails;
