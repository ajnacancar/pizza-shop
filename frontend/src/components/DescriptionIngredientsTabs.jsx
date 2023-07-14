import React, { useState } from "react";
import { GiFullPizza } from "react-icons/gi";

function DescriptionIngredientsTabs({ description, ingredients }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="w-full space-y-10">
      <div className="flex items-center space-x-10">
        <button
          onClick={() => {
            setActiveTab("description");
          }}
          className={`${
            activeTab === "description"
              ? "bg-gradient-to-r from-[#f27121] to-[#c97642]"
              : "bg-gradient-to-r from-[#494949] to-[#313131]"
          } px-2 py-1 text-white font-bold text-lg w-32 h-10`}
        >
          Description
        </button>
        <button
          onClick={() => {
            setActiveTab("ingridients");
          }}
          className={`${
            activeTab === "ingridients"
              ? "bg-gradient-to-r from-[#f27121] to-[#c97642]"
              : "bg-gradient-to-r from-[#494949] to-[#313131]"
          } px-2 py-1 text-white font-bold text-lg w-32 h-10`}
        >
          Ingridients
        </button>
      </div>

      <div>
        {activeTab === "description" && (
          <div>
            <p className="text-white text-xl">{description}</p>
          </div>
        )}

        {activeTab === "ingridients" && (
          <div>
            <ul>
              {ingredients &&
                ingredients.map((ingrid, index) => (
                  <li
                    key={index}
                    className="text-white text-xl flex items-center space-x-5"
                  >
                    <GiFullPizza size={20} /> <p>{ingrid}</p>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DescriptionIngredientsTabs;
