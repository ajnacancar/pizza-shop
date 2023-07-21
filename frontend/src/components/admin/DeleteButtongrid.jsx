import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePizza } from "../../features/pizza/pizzaSlice";
import { toast } from "react-toastify";
import {BsFillTrash3Fill} from "react-icons/bs"
import { deleteCategory } from "../../features/catrgoty-pizza/categorySlice";

function DeleteButtongrid({ item, id }) {
  const { pizzaCrudSuccess, pizzaCrudError, message } = useSelector(
    (state) => state.pizzas
  );
  const dispatch = useDispatch();

  const deleteItem = () => {
    if (item === "category") {
      dispatch(deleteCategory(id))
    } else if (item === "pizza") {
      dispatch(deletePizza(id));
    }
  };

  useEffect(() => {
    if (pizzaCrudError) {
      toast.error(message);
    }

    if (pizzaCrudSuccess) {
      toast.success("Pizza deleted!")
      setTimeout(() => {
        window.location.reload();
      }, 3000)
    }
  }, [pizzaCrudError, pizzaCrudSuccess, message]);
  return (
    <BsFillTrash3Fill size={30} color="red" className="cursor-pointer" onClick={deleteItem} />
      
  );
}

export default DeleteButtongrid;
