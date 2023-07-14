import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      navigate("/search/" + input);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form
        className="w-full flex items-center justify-center my-7"
        onSubmit={submitHandler}
      >
          <input 
          className="w-[70%] lg:w-1/3 h-10 rounded-md focus:outline-none px-3"
            onChange={(e) => setInput(e.target.value)}
            type="text"
            value={input}
          />
      </form>
     </>
  );
}

export default Search;
