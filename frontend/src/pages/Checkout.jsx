import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { clearCart } from "../features/basket/basketSlice";
import axios from "axios";
import { createOrder } from "../features/order/orderSlice";
import { reset } from "../features/auth/authSlice";

function Checkout() {
  const { items, basketTotalAmount } = useSelector((state) => state.basket);
  const { isSuccess, isError, message } = useSelector((state) => state.order);
  const [city, setCity] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listItems = items.map((item) => {
    return {
      product_id: item.id,
      quantity: item.quantity,
      unit_price_amount: item.priceSize,
      total_line_amount: item.pizzaPrice,
    };
  });
  const formik = useFormik({
    initialValues: {
      status: "new",
      price_amount: basketTotalAmount,
      price_currency: "$",
      shipping_street: "",
      shipping_city: "--Please Choose City--",
      shipping_postal_code: "",
      shipping_country: "BiH",
      special_instructions: "",
      line_items: listItems,
    },
    validationSchema: Yup.object({
      shipping_street: Yup.string().required("Required"),
      shipping_city: Yup.string().required("Required"),
      shipping_postal_code: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      dispatch(createOrder(values));
    },
  });

  const getCities = async () => {
    const response = await axios.get("/address/getAllCities?country=BA");
    const uniqueName = [];
    const uniqueCities = response.data.filter((element) => {
      const isDuplicate = uniqueName.includes(element);

      if (!isDuplicate) {
        uniqueName.push(element);

        return true;
      }

      return false;
    });

    setCity(uniqueCities);
  };

  useEffect(() => {
    if (isSuccess !== null) {
      toast.success("Order is created");
      dispatch(clearCart());
      navigate("/success");
      dispatch(reset());
    }

    if (isError !== null) {
      dispatch(reset());
    }


  }, [isSuccess, isError]);

  useEffect(() => {
    dispatch(reset());
    getCities();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#272629] py-10 lg:px-20 px-5">
      <Header />
      <div className="my-20">
        <div className="w-full">
          <h1 className="text-4xl text-[#c97642] capitalize font-bold text-center mb-10">
            Checkout the order
          </h1>

          <div className="w-full flex justify-center">
            <form className="lg:w-1/2 w-full" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col w-full">
                <div className="flex justify-center items-center">
                  <select
                    name="shipping_city"
                    id="shipping_city"
                    className="lg:w-[70%] w-full h-10 rounded-md bg-[#272629] py-1 px-2 border-b border-r border-white focus:outline-none text-white my-2"
                    value={formik.values.shipping_city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option disabled defaultValue>
                      --Please Choose City--
                    </option>
                    {city.length > 0 &&
                      city.map((item) => (
                        <option key={item} value={item}>
                          {" "}
                          {item}{" "}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="flex justify-center items-center">
                  <input
                    className="lg:w-[70%] w-full h-10 rounded-md bg-[#272629] py-1 px-2 border-b border-r border-white focus:outline-none text-white my-2"
                    type="text"
                    placeholder="Shipping postal code"
                    value={formik.values.shipping_postal_code}
                    onChange={formik.handleChange}
                    id="shipping_postal_code"
                    name="shipping_postal_code"
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div className="flex justify-center items-center">
                  <input
                    className="lg:w-[70%] w-full h-10 rounded-md bg-[#272629] py-1 px-2 border-b border-r border-white focus:outline-none text-white my-2"
                    type="text"
                    placeholder="Shipping street"
                    value={formik.values.shipping_street}
                    onChange={formik.handleChange}
                    id="shipping_street"
                    name="shipping_street"
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div className="flex justify-center items-center">
                  <textarea
                    rows={5}
                    className="lg:w-[70%] w-full rounded-md bg-[#272629] py-1 px-2 border-b border-r border-white focus:outline-none text-white my-2"
                    name="special_instructions"
                    id="special_instructions"
                    value={formik.values.special_instructions}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Special instructions"
                  ></textarea>
                </div>

                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="lg:w-[70%] w-full h-10 rounded-md] py-1 px-2 bg-[#c97642] text-white my-2 rounded-md"
                  >
                    Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
