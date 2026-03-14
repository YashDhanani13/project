import React, { useState } from "react";
const ContactFilter = ({
  setFilterField,
  setFilterValue,
  close,
}) => {

  const [field, setField] = useState("");
  const [value, setValue] = useState("");
  const [cancelFilter, setCancelFilter] = useState(false);

  return (
    <div>
      <h1 className="font-bold">Filter Contact</h1>
      <hr />
      {/* SELECT */}
      <select
        value={field}
        onChange={(e) => setField(e.target.value)}
        className="border p-3 m-3 w-30    font-bold rounded-lg"
      >
        <option value="">Select</option>
        <option value="name">Name</option>
        <option value="phoneNumber">Phone Number</option>
        <option value="tag">Tags </option>
        <option value="email">Email</option>
      </select>
      {/* INPUT */}
      {field && (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="border p-2 w-40 m-2 font-bold rounded-lg"
        />
      )}
      {/* BUTTONS */}

      <div>
        <button
          className="border p-2 m-2 w-40 font-bold text-lg rounded-lg  bg-white text-black"
      onClick={() => {
  if (!field || !value) {
    alert("Please select field and enter value!");
    return;
  }
  setFilterField(field);
  setFilterValue(value);
  setCancelFilter(true);  // ✅
  close();
}}

        >
          Cancel
        </button>

        <button
          className="border p-2 m-2 w-40 font-bold text-lg rounded-lg bg-blue-500 text-white"
          onClick={() => {
            setFilterField(field);
            setFilterValue(value);
            close();
          }}
        >
          Apply
        </button>
      </div>

      {/* SHOW FILTER */}
      {cancelFilter && (
        <div className=" absolute  top-2 m-0.2  p-2 bg-green-600 right-20 text-black   rounded-lg w-30 font-bold"  >
          Filter Applied
        </div>
      )}
    </div>
  );
};

export default ContactFilter;