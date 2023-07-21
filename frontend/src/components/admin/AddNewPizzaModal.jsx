import Modal from "react-modal";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createPizza,
  reset,
  updatePizza,
} from "../../features/pizza/pizzaSlice";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    width: "600px",
    maxWidth: "100%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};
Modal.setAppElement("#root");

function AddNewPizzaModal({ label, isNew, pizza, categories }) {
  const { pizzaCrudSuccess, pizzaCrudError, message } = useSelector(
    (state) => state.pizzas
  );
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: pizza ? pizza.name : "",
      price: pizza ? parseFloat(pizza.price) : 0,
      description: pizza ? pizza.description : "",
      category_id: pizza ? pizza.category_id : "--Please Choose category--",
      ingredients: pizza ? pizza.ingredients : "",
      picture_link: pizza ? pizza.picture_link : "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      price: Yup.number()
        .required("Required")
        .min(1, "Price must be higher then 0."),
      description: Yup.string().required("Required"),
      category_id: Yup.string().required("Required"),
      ingredients: Yup.string().required("Required"),
      picture_link: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (isNew) {
        dispatch(createPizza(values));
      } else {
        values.id = pizza.id
        dispatch(updatePizza(values));
      }
    },
  });

  useEffect(() => {
    if (pizzaCrudError) {
      toast.error(message);
      dispatch(reset());
    }

    if (pizzaCrudSuccess) {
      setOpenModal(false);
      window.location.reload();
    }

    formik.resetForm();
  }, [pizzaCrudError, pizzaCrudSuccess]);
  return (
    <>
      <div
        onClick={() => setOpenModal(true)}
        className="p-3 bg-[#c97642] rounded-md cursor-pointer"
      >
        <p className="text-white font-bold capitalize">{label}</p>
      </div>
      <Modal
        isOpen={openModal}
        onRequestClose={setOpenModal}
        style={customStyles}
        contentLabel={label}
      >
        <div
          onClick={() => setOpenModal(false)}
          className="text-3xl absolute top-1 right-1 cursor-pointer text-red-400"
        >
          <AiFillCloseCircle />
        </div>

        <div className="w-full p-4">
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full">
              <div className="lg:flex justify-between items-center lg:space-x-5">
                <div className="w-full my-2">
                  <input
                    className="w-full p-2 focus:outline-none border border-gray-400"
                    type="text"
                    placeholder="Name of Pizza"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    id="name"
                    name="name"
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div className="w-full my-2">
                  <input
                    className="w-full p-2 focus:outline-none border border-gray-400"
                    type="number"
                    placeholder="Price of Pizza"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    id="price"
                    name="price"
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>

              <div className="w-full my-2">
                <input
                  className="w-full p-2 focus:outline-none border border-gray-400"
                  type="text"
                  placeholder="Ingredients of Pizza"
                  value={formik.values.ingredients}
                  onChange={formik.handleChange}
                  id="ingredients"
                  name="ingredients"
                  onBlur={formik.handleBlur}
                />

                <p className="text-sm text-red-700 font-light">
                  Please separet with comma ( , )
                </p>
              </div>

              <div className="lg:flex justify-between items-center lg:space-x-5">
                <div className="w-full my-2">
                  <select
                    name="category_id"
                    className="w-full p-2 focus:outline-none border border-gray-400"
                    id="category_id"
                    value={formik.values.category_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option disabled defaultValue>
                      --Please Choose category--
                    </option>
                    {categories &&
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="w-full my-2">
                  <input
                    className="w-full p-2 focus:outline-none border border-gray-400"
                    type="text"
                    placeholder="Picture of Pizza"
                    value={formik.values.picture_link}
                    onChange={formik.handleChange}
                    id="picture_link"
                    name="picture_link"
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>

              <div className="w-full my-2">
                <textarea
                  rows={10}
                  className="w-full p-2 focus:outline-none border border-gray-400"
                  type="text"
                  placeholder="Description of Pizza"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  id="description"
                  name="description"
                  onBlur={formik.handleBlur}
                ></textarea>
              </div>

              <button
                className="rounded-sm px-4 my-2 py-2 bg-[#c97642] text-white font-bold"
                type="submit"
              >
                {label}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default AddNewPizzaModal;
