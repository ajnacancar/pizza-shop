import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../features/catrgoty-pizza/categorySlice";
import { NavLink } from "react-router-dom";
import { GiFullPizza } from "react-icons/gi";
import { TbPizza } from "react-icons/tb";

function Categories() {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="w-full mb-3">
      <div className="flex items-center justify-center space-x-6">
        <NavLink
          to={"/category/all"}
          className="w-24 h-24 rounded-full flex justify-center items-center bg-gradient-to-r from-[#494949] to-[#313131]"
        >
          <div className="text-white">
            <GiFullPizza size={20} />
            <h4 className="text-sm">All</h4>
          </div>
        </NavLink>

        {categories &&
          categories.map((category) => (
            <NavLink
              key={category.id}
              to={`/category/${category.id}`}
              className="w-24 h-24 rounded-full flex justify-center items-center bg-gradient-to-r from-[#494949] to-[#313131]"
            >
              <div className="text-white flex justify-center items-center w-full flex-col">
               <TbPizza size={20} />
               <h4 className="text-sm">{category.name}</h4>
              </div>
            </NavLink>
          ))}
      </div>
    </div>
  );
}

export default Categories;
