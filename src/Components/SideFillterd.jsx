import React from 'react'

const SideFillterd = () => {
  return (
    <div>

      <h1 className='text-black font-bold text-2xl'>chooice fillter here </h1>

      <div>  

        {/* status click here  */}
        <input type="checkbox" />
        <span
          className={`inline-block mt-1 px-3 py-1 text-xs font-bold rounded-full ${selectedEmployee.status === "ACTIVE"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
            }`} >
          {selectedEmployee.status}
        </span>
      </div>


      {/* role chooice  here  */}
      <div>
        <input type="checkbox" />
        <p className=" mt-1 px-3 py-1 text-xs font-semibold rounded-full text-black bg-gray-400 ">{selectedEmployee.role}</p>
      </div>
    </div>
  )
}

export default SideFillterd



