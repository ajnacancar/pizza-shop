import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchPizza } from "../features/pizza/pizzaSlice";
import { reset } from "../features/auth/authSlice";
import Card from "../components/Card";

function SearchPage() {
  const { search } = useParams();
  const { pizzas, isSuccess } = useSelector((state) => state.pizzas);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
    dispatch(searchPizza(search));
  }, [dispatch, isSuccess, search]);
  return (
    <div className="min-h-screen flex flex-col bg-[#272629] py-10 lg:px-20 px-5">
      <Header />
      <div className="mb-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {pizzas &&
            pizzas.map((pizza) => <Card key={pizza.id} pizza={pizza} />)}
        </div>

        {pizzas && pizzas.length === 0 && (
          <h1 className="font-Lobster-Two text-white text-center text-3xl">
            No Pizzas Found!
          </h1>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SearchPage;
