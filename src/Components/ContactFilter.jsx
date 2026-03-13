import React, { useState } from "react";

const ContactFilter = () => {
  const [field, setField] = useState("");
  return (
    <div className="">
      <div>
        <h1 className="font-bold w-full m-0.5 p-0.5 flex justify-start">Filter Contact</h1>
        <hr className="w-100 absolute left-1 " />
      </div>
      <div className="flex justify-center ">

        <div className="flex justify-evenly">
          <select
            value={field}
            onChange={(e) => setField(e.target.value)}
            className="border border-black  rounded-lg absolute left-1 font-bold w-45  p-3 m-2 "
          >
            <option value="" className="">Select</option>
            <option value="name">Name</option>
            <option value="phone">Phone</option>
            <option value="email">Email</option>
          </select>


        </div>
        <div className="flex justify-center relative top-17  left-15">
          <button className="bg-white  text-black border  border-black  hover:bg-gray-400 cursor-pointer p-2 m-2 rounded-lg w-30">
            Cancle
          </button>


          <button className="bg-white  text-black border hover:bg-blue-500 hover:text-white hover:border-black  border-0.5  cursor-pointer p-2 m-2 rounded-lg w-30" >Apply</button>
        </div>
        {field && (
          <input
            className="border absolute font-bold text-black  w-45 top-14 rounded-lg  right-3  p-3 ml-2"
            placeholder="Enter value"
          />
        )}

      </div>



    </div>
  );
};

export default ContactFilter;