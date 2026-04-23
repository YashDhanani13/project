import React from "react";

const ContactSkeleton = () => {
  return (
    <div className="w-full space-y-6">

      <div className="border rounded-lg overflow-hidden border-gray-200 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-gray-300  to-indigo-600">
            <tr>
              <th className="p-4 w-10">
                <div className="h-4 w-4 bg-purple-300/50 rounded"></div>
              </th>
              <th className="p-4 text-mist-700 font-medium">Name</th>
              <th className="p-4 text-mist-700 font-medium">Email</th>
              <th className="p-4 text-mist-700 font-medium">Age</th>
              <th className="p-4 text-mist-700 font-medium">Tags</th>
              <th className="p-4 text-mist-700 font-medium">Mobile</th>
              <th className="p-4 text-mist-700 font-medium">Address</th>
            </tr>
          </thead>

          <tbody className="text-mist-700 ">
            {[...Array(8)].map((_, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 animate-pulse"
              >
                <td className="p-4">
                  <div className="h-4 w-4  bg-gradient-to-r  from-mist-600 to-blue-600 rounded"></div>
                </td>
                <td className="p-4">
                  <div className="h-4  bg-gradient-to-r  from-mist-600 to-blue-600  rounded w-20"></div>
                </td>
                <td className="p-4">
                  <div className="h-4  bg-gradient-to-r  from-mist-600 to-blue-600  rounded w-40"></div>
                </td>
                <td className="p-4">
                  <div className="h-4  bg-gradient-to-r  from-mist-600 to-blue-600 rounded w-8"></div>
                </td>
                <td className="p-4">
                  <div className="h-6 bg-gradient-to-r  from-mist-600 to-blue-600 rounded-full w-16"></div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-6  bg-gradient-to-r  from-mist-600 to-blue-600  rounded-sm"></div>
                    <div className="h-4  bg-gradient-to-r  from-mist-600 to-blue-600  rounded w-24"></div>
                  </div>
                </td>

                <td className="p-4">
                  <div className="h-4  bg-gradient-to-r  from-mist-600 to-blue-600  rounded w-48"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactSkeleton;
