import React from "react";

const ContactSkeleton = () => {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between gap-4 animate-pulse">
        <div className="w-32 h-10 bg-gray-200 rounded-md border border-gray-300"></div>

        <div className="flex-1 h-10 bg-gray-100 rounded-md border border-gray-200"></div>

        <div className="w-40 h-10 bg-gray-200 rounded-md border border-gray-300"></div>
      </div>

      <div className="border rounded-lg overflow-hidden border-gray-200 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#9333ea]">
            <tr>
              <th className="p-4 w-10">
                <div className="h-4 w-4 bg-purple-300/50 rounded"></div>
              </th>
              <th className="p-4 text-white font-medium">Name</th>
              <th className="p-4 text-white font-medium">Email</th>
              <th className="p-4 text-white font-medium">Age</th>
              <th className="p-4 text-white font-medium">Tags</th>
              <th className="p-4 text-white font-medium">Mobile</th>
              <th className="p-4 text-white font-medium">Address</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {[...Array(8)].map((_, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 animate-pulse"
              >
                <td className="p-4">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div>
                </td>
                <td className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                </td>
                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-40"></div>
                </td>
                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-8"></div>
                </td>
                <td className="p-4">
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-6 bg-gray-300 rounded-sm"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </td>

                <td className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
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
