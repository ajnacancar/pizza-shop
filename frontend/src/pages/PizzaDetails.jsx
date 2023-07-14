import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../features/basket/basketSlice";
import { toast } from "react-toastify";
import { getSinglePizza, setRating } from "../features/pizza/pizzaSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StarRatings from "react-star-ratings";
import DescriptionIngredientsTabs from "../components/DescriptionIngredientsTabs";

function PizzaDetails() {
  const { id } = useParams();
  const { pizza, isError, message } = useSelector((state) => state.pizzas);
  const {
    isSuccess,
    isError: basketError,
  } = useSelector((state) => state.basket);

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [ingridients, setIngridients] = useState([]);
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("s");

  const handleSubmit = (e) => {
    e.preventDefault();

    let priceSize = pizza.price;

    if (size === "m") {
      priceSize = pizza.price * 1.25;
    } else if (size === "l") {
      priceSize = pizza.price * 1.5;
    }

    const tempProduct = {
      ...pizza,
      quantity,
      size,
      pizzaPrice: price,
      priceSize,
    };
    dispatch(addToCart(tempProduct));
  };

  const ratingSet = (data) => {
    const ratingData = {
      product_id: id,
      rating: data,
    };
    dispatch(setRating(ratingData));
  };

  const calculatePrice = (s, q) => {
    let p = 0;
    if (s === "s") {
      p = pizza.price * q;
    } else if (s === "m") {
      p = pizza.price * 1.25 * q;
    } else if (s === "l") {
      p = pizza.price * 1.5 * q;
    }

    setPrice(p);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (basketError) {
      toast.error(basketError);
    }

    if (isSuccess) {
      toast.success("Pizza added to basket");
    }

    dispatch(getSinglePizza(id));
    let ingrid = pizza.ingredients?.split(",");
    setIngridients(ingrid);

    setPrice(pizza.price);
  }, [
    id,
    basketError,
    dispatch,
    isError,
    isSuccess,
    message,
    pizza.ingredients,
    pizza.price,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#272629] py-10 lg:px-20 px-5">
      <Header />
      <div className="my-20">
        <div className="w-full flex justify-center">
          <div className="lg:w-[80%]">
          {pizza && (
          <div className="flex flex-col md:flex-row justify-between items-start space-y-10 lg:space-y-0">
            <div className="lg:w-1/2 space-y-10">
              <h2 className="text-white text-3xl font-Lobster-Two">
                {pizza.name}
              </h2>

              <p className="text-white text-2xl">
                Pizza Rating: {pizza.rating}
              </p>

              <img
                src={pizza.picture_link}
                alt={pizza.name}
                className="w-96 h-full rounded-sm"
              />

              <div>
                <h4 className="text-white font-Lobster-Two text-3xl">
                  Add Your Rating:
                </h4>
                <StarRatings
                  numberOfStars={5}
                  rating={0}
                  starRatedColor="#f27121"
                  changeRating={ratingSet}
                />
              </div>
            </div>

            <div className="lg:w-1/2 space-y-10">
              <DescriptionIngredientsTabs
                description={pizza.description}
                ingredients={ingridients}
              />

              <div className="space-y-5">
                <h2 className="text-3xl text-gray-400 font-bold">Size</h2>

                <div className="space-x-5">
                  <button
                    onClick={() => (
                      setSize("s"), calculatePrice("s", quantity)
                    )}
                    className={`${
                      size === "s"
                        ? "bg-gradient-to-r from-[#f27121] to-[#c97642]"
                        : "bg-gradient-to-r from-[#494949] to-[#313131]"
                    } px-2 py-1 text-white text-lg font-bold p-4 w-10 h-10`}
                  >
                    S
                  </button>
                  <button
                    onClick={() => (
                      setSize("m"), calculatePrice("m", quantity)
                    )}
                    className={`${
                      size === "m"
                        ? "bg-gradient-to-r from-[#f27121] to-[#c97642]"
                        : "bg-gradient-to-r from-[#494949] to-[#313131]"
                    } px-2 py-1 text-white text-lg font-bold p-4 w-10 h-10`}
                  >
                    M
                  </button>

                  <button
                    onClick={() => (
                      setSize("l"), calculatePrice("l", quantity)
                    )}
                    className={`${
                      size === "l"
                        ? "bg-gradient-to-r from-[#f27121] to-[#c97642]"
                        : "bg-gradient-to-r from-[#494949] to-[#313131]"
                    } px-2 py-1 text-white text-lg font-bold p-4 w-10 h-10`}
                  >
                    L
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-3xl text-gray-400 font-bold">
                  Price: <span className="text-[#f27121]"> ${price} </span>
                </h2>
              </div>

              <form
                className="flex items-center space-x-5"
                onSubmit={(e) => handleSubmit(e)}
              >
                <input
                  min={1}
                  max={20}
                  className="w-16 h-10 text-center rounded-md text-xl p-1"
                  type="number"
                  id="quantity"
                  name="quanity"
                  value={quantity}
                  onChange={(e) => (
                    setQuantity(e.target.value),
                    calculatePrice(size, e.target.value)
                  )}
                />
                <button
                  className="bg-[#C97642] rounded-md text-white font-bold w-1/2 h-10"
                  type="submit"
                >
                  Add to card
                </button>
              </form>
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PizzaDetails;
