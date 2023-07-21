import React, { useEffect, useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { reset, updateCategory } from "../../features/catrgoty-pizza/categorySlice";
import { toast } from "react-toastify";

function EditCategoryName({ name, id }) {
  const { categoryCrudError, categoryCrudSuccess, message } = useSelector(
    (state) => state.categories
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name ? name : "");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategory({ id, name:editedName }));
  };

  useEffect(() => {
    if (categoryCrudError) {
      toast.error(message);
      dispatch(reset());
    }

    if (categoryCrudSuccess) {
      dispatch(reset())
      // window.location.reload();
    }
  }, [categoryCrudError, categoryCrudSuccess])
  return (
    <>
      {isEditing ? (
        <div className="w-full">
          <form onSubmit={(e) => handleSubmit(e)} className="w-full">
            <input
              className="w-full h-fit focus:outline-none"
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />

            <button className="hidden" type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <LiaEdit
          className="cursor-pointer"
          size={30}
          color="green"
          onClick={() => setIsEditing(true)}
        />
      )}
    </>
  );
}

export default EditCategoryName;
