import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

export const USER_DATA = "user";
export const ADMIN_DATA = "admin";



export const columns_table_order = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
  
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
     
    },
    {
      field: "amountPrice",
      headerName: "Amount price",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
  
    {
      field: "orderDate",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
        field: " ",
        flex: 1,
        minWidth: 150,
        headerName: "",
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <>
              <Link to={`/admin/orders/${params.id}`}>
                <button>
                  <AiOutlineArrowRight size={20} />
                </button>
              </Link>
            </>
          );
        },
      },
  ];
