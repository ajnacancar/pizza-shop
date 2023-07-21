import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import AddNewPizzaModal from "../components/admin/AddNewPizzaModal";
import DeleteButtongrid from "../components/admin/DeleteButtongrid";
import EditCategoryName from "../components/admin/EditCategoryName";

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

export const columns_table_pizzas = [
  {
    field: "id",
    headerName: "Pizza ID",
    minWidth: 150,
    flex: 0.7,
  },
  {
    field: "image",
    headerName: "Image",
    minWidth: 150,
    renderCell: (params) => <img src={params.value} className="h-20 w-20" />,
    flex: 0.7,
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 150,
    flex: 0.7,
  },
  {
    field: "price",
    headerName: "Price",
    minWidth: 150,
    flex: 0.7,
  },
  {
    field: "category",
    headerName: "Category",
    minWidth: 150,
    flex: 0.7,
  },
  {
    field: "edit",
    headerName: "Edit",
    minWidth: 150,
    renderCell: (props) => (
      <AddNewPizzaModal
        label="Edit Pizza"
        pizza={props.row.edit.item}
        isNew={false}
        categories={props.row.edit.categories}
      />
    ),
    flex: 0.7,
  },
  {
    field: "delete",
    headerName: "Delete",
    minWidth: 150,
    renderCell: (params) => <DeleteButtongrid item="pizza" id={params.id} />,
    flex: 0.7,
  },
  {
    field: " ",
    flex: 1,
    minWidth: 150,
    headerName: "See on Front",
    type: "number",
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          <Link to={`/pizza/${params.id}`} target="_blank">
            <button>
              <AiOutlineArrowRight size={20} />
            </button>
          </Link>
        </>
      );
    },
  },
];

export const columns_table_categories = [
  {
    field: "id",
    headerName: "Category ID",
    minWidth: 150,
    flex: 0.7,
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 150,
    flex: 0.7,
  },
  {
    field: "edit",
    headerName: "Edit",
    minWidth: 150,
    renderCell: (params) => <EditCategoryName name={params.row.name} id={params.row.id} />,
    flex: 0.7,
  },
  {
    field: "delete",
    headerName: "Delete",
    minWidth: 150,
    renderCell: (params) => <DeleteButtongrid item="category" id={params.id} />,
    flex: 0.7,
  },

 
];
