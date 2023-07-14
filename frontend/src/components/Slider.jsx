import React from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

function Slider({ pizzas, title }) {
  return (
    <>
      <div className="mt-16">
        <h3 className="text-[#c97642] font-Lobster-Two text-4xl mb-5">
          {title}
        </h3>

        <Splide
          options={{
            perPage: 3,
            arrows: true,
            pagination: false,
            drag: "free",
            gap: "5rem",
            breakpoints: {
              700: {
                perPage: 1,
                perMove: 1,
              },
              935: {
                perPage: 2,
                perMove: 2,
              },
            },
          }}
        >
          {pizzas &&
            pizzas.map((pizza) => (
              <SplideSlide key={pizza.id}>
                <div className="min-h-[25rem] rounded-md ">
                  <Link to={`/pizza/${pizza.id}`} className="relative">
                    <p className="text-white font-Lobster-Two text-3xl absolute left-1/2 bottom-3"> {pizza.name} </p>
                    <img src={pizza.picture_link} alt={pizza.name} />
                  </Link>
                </div>
              </SplideSlide>
            ))}
        </Splide>
      </div>
    </>
  );
}

export default Slider;
