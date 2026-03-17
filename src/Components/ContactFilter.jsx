import React, { useState } from "react";
const ContactFilter = ({ setFilterField, setFilterValue, close }) => {
  const [field, setField] = useState("");
  const [value, setValue] = useState("");

  return (
    <div>
      <h1 className="font-bold">Filter Contact</h1>
      <hr />
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
      {field && (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="border p-2 w-40 m-2 font-bold rounded-lg"
        />
      )}
      <div className="flex gap-2 mt-3">
        <button
          className="flex-1 border p-2 rounded-lg bg-gray-200"
          onClick={() => {

  close();
}} >
          Cancel
        </button>

        <button
          className="flex-1 border p-2 rounded-lg bg-blue-500 text-white"
          onClick={() => {
            if (!field || !value) {
              alert("Please select field and enter value");
              return;
            }
            setFilterField("");
            setFilterValue("");

            setFilterField(field);
            setFilterValue(value);
            close();
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default ContactFilter;
