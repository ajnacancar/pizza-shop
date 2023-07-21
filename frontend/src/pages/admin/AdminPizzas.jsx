import React, { useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { DataGrid } from "@material-ui/data-grid";
import { PiPizza } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzasByCategory } from "../../features/pizza/pizzaSlice";
import { columns_table_pizzas } from "../../data/static_data";
import AddNewPizzaModal from "../../components/admin/AddNewPizzaModal";
import { getAllCategories } from "../../features/catrgoty-pizza/categorySlice";

function AdminPizzas() {
  const { pizzas } = useSelector((state) => state.pizzas);
  const { categories } = useSelector((state) => state.categories);
  const row = [];
  const dispatch = useDispatch();

  categories &&
    pizzas &&
    pizzas.forEach((item) => {
      row.push({
        id: item.id,
        image: item.picture_link,
        name: item.name,
        price: item.price,
        // category:
        //   categories &&
        //   categories.find((element) => element.id === item.category_id).name,
        edit: { item, categories },
      });
    });

  useEffect(() => {
    dispatch(getAllPizzasByCategory("all"));
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      <div className="w-full flex lg:flex-row flex-col">
        <Sidebar />
        <div className="w-full p-5 lg:p-10">
          <div className="w-full mt-10">
            <div className="w-full flex justify-between items-center my-5">
              <div className="text-2xl font-bold my-2 flex items-center space-x-3">
                <PiPizza size={30} color="#c97642" /> <h1>All Pizzas</h1>
              </div>

              {categories && (
                <AddNewPizzaModal
                  label="Add New Pizza"
                  isNew={true}
                  categories={categories}
                />
              )}
            </div>
            <DataGrid
              rows={row}
              columns={columns_table_pizzas}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPizzas;
