import React, { useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { LiaPizzaSliceSolid } from "react-icons/lia";
import { BsPeopleFill } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import {MdAttachMoney} from "react-icons/md"
import { DataGrid } from "@material-ui/data-grid";
import { columns_table_order } from "../../data/static_data";
import { useDispatch, useSelector } from "react-redux"
import { getAllOrdersAdmin } from "../../features/order/orderSlice"
import moment from "moment";


function AdminHome() {
  const {orders } = useSelector((state) => state.order)
  const row = [];
  const dispatch = useDispatch()

  orders &&
  orders.slice(-3).forEach((item) => {
    row.push({
      id: item.id,
      status: item.status,
      amountPrice: item.price_amount,
      orderDate: moment().format("DD/MM/YYYY", item.order_date),
    });
  });


    useEffect(() => {
        dispatch(getAllOrdersAdmin())
    }, [dispatch])

  return (
    <div className="w-full flex lg:flex-row flex-col">
      <Sidebar />

      <div className="lg:p-10 p-5 w-full">
       
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
          <div className="col-span-1 rounded-md bg-slate-200 shadow-md p-5 space-y-3">
            <div className="flex justify-between items-center">
            <BsPeopleFill size={30} />
              <p className="text-xl font-bold">Users</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-xl">Total users: </p>
              <p className="text-lg">10</p>
            </div>
          </div>


          <div className="col-span-1 rounded-md bg-slate-200 shadow-md p-5 space-y-3">
            <div className="flex justify-between items-center">
              <LiaPizzaSliceSolid size={30} />
              <p className="text-xl font-bold">Pizzas</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-xl">Total Pizzas: </p>
              <p className="text-lg">10</p>
            </div>
          </div>


          <div className="col-span-1 rounded-md bg-slate-200 shadow-md p-5 space-y-3">
            <div className="flex justify-between items-center">
            <BiCategoryAlt size={30} />
              <p className="text-xl font-bold">Categories</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-xl">Total Categories: </p>
              <p className="text-lg">10</p>
            </div>
          </div>

          <div className="col-span-1 rounded-md bg-slate-200 shadow-md p-5 space-y-3">
            <div className="flex justify-between items-center">
            <MdAttachMoney size={30} />
              <p className="text-xl font-bold">Money</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-xl">Total Earning: </p>
              <p className="text-lg">10</p>
            </div>
          </div>
        </div>


        <div className="w-full mt-10">
        <h1 className="text-2xl font-bold my-2">Latest Orders</h1>
        <DataGrid
        rows={row}
        columns={columns_table_order}
        pageSize={3}
        disableSelectionOnClick
        autoHeight
      />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
