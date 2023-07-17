import React, { useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAllOrdersAdmin } from "../../features/order/orderSlice";
import { DataGrid } from "@material-ui/data-grid";
import { columns_table_order } from "../../data/static_data";

function AdminOrders() {
  const { orders } = useSelector((state) => state.order);
  const row = [];
  const dispatch = useDispatch();

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item.id,
        status: item.status,
        amountPrice: item.price_amount,
        orderDate: moment().format("DD/MM/YYYY", item.order_date),
      });
    });

  useEffect(() => {
    dispatch(getAllOrdersAdmin());
  }, [dispatch]);
  
  return (
    <div className="w-full flex lg:flex-row flex-col">
      <Sidebar />
      <div className="w-full p-5 lg:p-10">
        <div className="w-full mt-10">
          <h1 className="text-2xl font-bold my-2">All Orders</h1>
          <DataGrid
            rows={row}
            columns={columns_table_order}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
