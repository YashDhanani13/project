import React from "react";

const ContactSkeleton = () => {
  return (
    <div className="w-full space-y-6">

      <div className="border rounded-lg text-white overflow-hidden border-blaclk  shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-700 text-black">
            <tr>
              <th className="p-4 w-10">
                <div className="h-4 w-4 bg-purple-300/50 rounded"></div>
              </th>
              <th className="p-4  font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Age</th>
              <th className="p-4 font-medium">Tags</th>
              <th className="p-4 font-medium">Mobile</th>
              <th className="p-4 font-medium">Address</th>
            </tr>
          </thead> 

          <tbody className=" text-mist-700 ">
            {[...Array(8)].map((_, index) => (
              <tr
                key={index}
                className="border-b border-black animate-pulse"
              >
                <td className="p-4">
                  <div className="h-4 w-4   bg-slate-700 rounded"></div>
                </td>
                <td className="p-4">
                  <div className="h-4  bg-slate-700 rounded w-20"></div>
                </td>
                <td className="p-4">
                  <div className="h-4  bg-slate-700 rounded w-40"></div>
                </td>
                <td className="p-4">
                  <div className="h-4   bg-slate-700 rounded w-8"></div>
                </td>
                <td className="p-4">
                  <div className="h-6  bg-slate-700 rounded-full w-16"></div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-6  bg-slate-700 rounded-sm"></div>
                    <div className="h-4  bg-slate-700  rounded w-24"></div>
                  </div>
                </td>

                <td className="p-4">
                  <div className="h-4  bg-slate-700  rounded w-48"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="flex items-center justify-between animate-pulse px-1">
        <div className="h-4  bg-slate-700  rounded w-48"></div>
        <div className="flex items-center gap-3">
          <div className="h-4  bg-slate-700  rounded w-28"></div>
          <div className="h-8 bg-slate-700  rounded w-16"></div>
          <div className="h-8  bg-slate-700 rounded w-16"></div>
          <div className="h-4  bg-slate-700  rounded w-20"></div>
          <div className="h-8  bg-slate-700  rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactSkeleton;
