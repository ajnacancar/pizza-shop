import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiCategoryAlt } from 'react-icons/bi'
import { BsPeopleFill } from 'react-icons/bs'
import { HiShoppingBag } from 'react-icons/hi'
import { LiaPizzaSliceSolid } from 'react-icons/lia'
import { NavLink } from 'react-router-dom'

function SidebarLinks() {
  return (
    < >
    <NavLink
      to={"/admin"}
      end
      className={({ isActive }) =>
        isActive
          ? "flex items-center space-x-3 my-5 bg-gray-400 p-2 text-white"
          : "flex items-center space-x-3 my-5 bg-transparent p-2 text-gray-400"
      }
    >
      <AiFillHome size={30} />

      <h1 className="text-xl ">Home</h1>
    </NavLink>

    <NavLink
      to={"/admin/pizzas"}
      className={({ isActive }) =>
        isActive
          ? "flex items-center space-x-3 my-5 bg-gray-400 p-2 text-white"
          : "flex items-center space-x-3 my-5 bg-transparent p-2 text-gray-400"
      }
    >
      <LiaPizzaSliceSolid size={30} />

      <h1 className="text-xl ">Pizzas</h1>
    </NavLink>

    <NavLink
      to={"/admin/categories"}
      className={({ isActive }) =>
        isActive
          ? "flex items-center space-x-3 my-5 bg-gray-400 p-2 text-white"
          : "flex items-center space-x-3 my-5 bg-transparent p-2 text-gray-400"
      }
    >
      <BiCategoryAlt size={30} />

      <h1 className="text-xl ">Categories</h1>
    </NavLink>

    <NavLink
      to={"/admin/users"}
      className={({ isActive }) =>
        isActive
          ? "flex items-center space-x-3 my-5 bg-gray-400 p-2 text-white"
          : "flex items-center space-x-3 my-5 bg-transparent p-2 text-gray-400"
      }
    >
      <BsPeopleFill size={30} />

      <h1 className="text-xl ">Users</h1>
    </NavLink>

    <NavLink
      to={"/admin/orders"}
      className={({ isActive }) =>
        isActive
          ? "flex items-center space-x-3 my-5 bg-gray-400 p-2 text-white"
          : "flex items-center space-x-3 my-5 bg-transparent p-2 text-gray-400"
      }
    >
      <HiShoppingBag size={30} />

      <h1 className="text-xl ">Orders</h1>
    </NavLink>
  </>
  )
}

export default SidebarLinks