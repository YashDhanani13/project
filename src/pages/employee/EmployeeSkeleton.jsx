const EmployeeSkeleton = () => {
  return (
    <div className="w-full space-y-6">
      <div className="border rounded-lg text-white overflow-hidden border-blaclk  shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-700 text-black">
            <tr>
              <th className="p-4 w-10">
                
                <div className="h-4 w-4  bg-slate-700 rounded"></div>
                </th>
              <th className="p-4  bg-slate-700  font-medium">Name</th>
              <th className="p-4 bg-slate-700 font-medium">Email</th>
              <th className="p-4  bg-slate-700  font-medium">Role</th>
              <th className="p-4  bg-slate-700  font-medium">Phone</th>
              <th className="p-4 bg-slate-700 font-medium">Status</th>
            </tr>
          </thead>

   <tbody className=" text-mist-700 ">
            {[...Array(8)].map((_, index) => (
     <tr key={index} className="border-b border-black animate-pulse">
                <td className="p-4">
                  <div className="h-4 w-4  bg-slate-700 rounded"></div>
                </td>
                <td className="p-4  ">
                  <div className="h-4  bg-slate-700 rounded w-28"></div>
                </td>
                <td className="p-4  ">
                  <div className="h-4  bg-slate-700 text-mist-700 rounded w-44"></div>
                </td>
                <td className="p-4">
                  <div className="h-4  bg-slate-700 rounded w-20"></div>
                </td>
                <td className="p-4">
                  <div className="h-4  bg-slate-700 rounded w-28"></div>
                </td>
                <td className="p-4">
                  <div className="h-6  bg-slate-700 rounded-full w-20"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

         <div className="flex items-center justify-between h-12 px-4 py-3 m-2">
          {/* Left */}
          <div className="h-4 bg-slate-700 rounded w-48"></div>

          {/* Center */}
          <div className="flex items-center gap-3">
            <div className="h-4 bg-slate-700 rounded w-28"></div>
            <div className="h-8 bg-slate-700 rounded w-16"></div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <div className="h-8 bg-slate-700 rounded w-16"></div>
            <div className="h-4 bg-slate-700 rounded w-20"></div>
            <div className="h-8 bg-slate-700 rounded w-20"></div>
          </div>
        </div>
      </div>
 

    </div>
  );
};

export default EmployeeSkeleton;