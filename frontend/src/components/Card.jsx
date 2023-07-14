import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/basket/basketSlice";
import { Link } from "react-router-dom";

function Card({ pizza }) {
  const [quantity, setQuantity] = useState(1);
  const [modalisOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempProduct = {
      ...pizza,
      quantity: quantity,
      size: "s",
      pizzaPrice: pizza.price * quantity,
      priceSize: pizza.price,
    };
    dispatch(addToCart(tempProduct));
  };
  return (
    <div>
      <div className="w-full mb-4 rounded-md ">
        <Link to={`/pizza/${pizza.id}`} className="relative">
          <div className="bg-[#C97642] absolute h-14 w-14 flex justify-center items-center text-white font-bold rounded-full -top-5 -left-5">
            <p className="text-xl"> ${pizza.price} </p>
          </div>
          <img src={pizza.picture_link} alt={pizza.name} />
          <div className="text-3xl text-white text-center font-Lobster-Two "> {pizza.name} </div>
        </Link>
        <form onSubmit={(e) => {handleSubmit(e)}} className="w-full flex items-center justify-between mt-2">
          <input
            min={1}
            max={100}
            className="w-16 h-10 text-center rounded-md text-xl p-1"
            type="number"
            id="quantity"
            name="quanity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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
  );
}

export default Card;
