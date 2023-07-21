import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { DataGrid } from "@material-ui/data-grid";
import { BiCategoryAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { columns_table_categories } from "../../data/static_data";
import {
  createCategory,
  getAllCategories,
  reset,
} from "../../features/catrgoty-pizza/categorySlice";
import {} from "../../features/catrgoty-pizza/categorySlice";
import { toast } from "react-toastify";

function AdminCategories() {
  const { categories, categoryCrudError, categoryCrudSuccess, message } =
    useSelector((state) => state.categories);
  const row = [];
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");

  categories &&
  categories.length > 0 &&
    categories.forEach((category) => {
      row.push({
        id: category.id,
        name: category.name,
      });
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory({ name }));
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categoryCrudError) {
      toast.error(message);
      dispatch(reset());
    }

    if (categoryCrudSuccess) {
      setShowForm(false);
      window.location.reload();
    }
  }, [categoryCrudError, categoryCrudSuccess]);

  return (
    <div className="w-full flex lg:flex-row flex-col">
      <Sidebar />
      <div className="w-full p-5 lg:p-10">
        <div className="w-full mt-10">
          <div className="w-full flex justify-between items-center my-5">
            <div className="text-2xl font-bold my-2 flex items-center space-x-3">
              <BiCategoryAlt size={30} color="#c97642" />
              <h1>All Categories</h1>
            </div>
            <div
              onClick={() => setShowForm(!showForm)}
              className="p-3 bg-[#c97642] rounded-md cursor-pointer"
            >
              <p className="text-white font-bold capitalize">Show form</p>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns_table_categories}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {showForm && (
            <form onSubmit={handleSubmit} className="mt-10 lg:w-1/3 w-full">
              <div className="w-full flex justify-between items-center my-2">
                <h1 className="text-[#c97642] capitalize font-2xl font-bold my-2">
                  add new category
                </h1>

                <p
                  onClick={() => setShowForm(false)}
                  className="text-lg font-light cursor-pointer"
                >
                  Close
                </p>
              </div>
              <div className="w-full my-2">
                <input
                  className="w-full p-2 focus:outline-none border border-gray-400"
                  type="text"
                  placeholder="Name of Pizza"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  name="name"
                />
              </div>
              <button
                className="rounded-sm px-4 py-2 bg-[#c97642] text-white font-bold my-2 "
                type="submit"
              >
                Add a Category
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminCategories;
