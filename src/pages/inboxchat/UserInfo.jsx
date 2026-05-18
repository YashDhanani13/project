import React from 'react'
import {
  Contact,
  Mail,
  MapPin,
  Pencil,
  Tag,
  UserRound,
  X,
  Camera,
} from 'lucide-react'

const UserInfo = ({selectedConversation}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex justify-end">
      {/* SIDEBAR */}
      <div className="w-full sm:w-[430px] h-screen bg-[#0b1120]/95 border-l border-white/10 shadow-2xl flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-4">
            <button className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 transition">
              <Pencil size={18} className="text-cyan-400" />
            </button>

            <h1 className="text-white text-xl font-semibold">
              Contact Profile
            </h1>
          </div>

          <button className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500 transition">
            <X size={20} className="text-slate-300" />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          {/* PROFILE AVATAR */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-[#111827]">
                YD
              </div>

              <button className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-400 flex items-center justify-center">
                <Camera size={18} className="text-black" />
              </button>
            </div>

            <h2 className="mt-5 text-2xl font-bold text-white">
           {selectedConversation.name}
            </h2>
          </div>
          {/* FIELDS */}
          <div className="mt-10 space-y-5">
            {/* FIELD 1 — Full Name */}
            <div className="group bg-white/[0.03] border border-white/10 rounded-3xl px-5 py-4 hover:border-cyan-400/40 transition-all duration-300">
              <label className="flex items-center gap-2 text-xs uppercase tracking-[2px] text-slate-400 mb-3">
                <UserRound
                  size={18}
                  className="text-cyan-400"
                />
         {selectedConversation.name}
              </label>

              <input
                type="text"
                placeholder="Enter full name"
                className="w-full bg-transparent outline-none text-white text-base placeholder:text-slate-500"
              />
            </div>

            {/* FIELD 2 — Email Address */}
            <div className="group bg-white/[0.03] border border-white/10 rounded-3xl px-5 py-4 hover:border-cyan-400/40 transition-all duration-300">
              <label className="flex items-center gap-2 text-xs uppercase tracking-[2px] text-slate-400 mb-3">
                <Mail size={18} className="text-cyan-400" />
               {selectedConversation.address}
              </label>

              <input
                type="text"
                placeholder="Enter email"
                className="w-full bg-transparent outline-none text-white text-base placeholder:text-slate-500"
              />
            </div>

            {/* FIELD 3 — Address */}
            <div className="group bg-white/[0.03] border border-white/10 rounded-3xl px-5 py-4 hover:border-cyan-400/40 transition-all duration-300">
              <label className="flex items-center gap-2 text-xs uppercase tracking-[2px] text-slate-400 mb-3">
                <MapPin size={18} className="text-cyan-400" />
                Address
              </label>

              <input
                type="text"
                placeholder="Enter address"
                className="w-full bg-transparent outline-none text-white text-base placeholder:text-slate-500"
              />
            </div>

            {/* FIELD 4 — Contact Number */}
            <div className="group bg-white/[0.03] border border-white/10 rounded-3xl px-5 py-4 hover:border-cyan-400/40 transition-all duration-300">
              <label className="flex items-center gap-2 text-xs uppercase tracking-[2px] text-slate-400 mb-3">
                <Contact size={18} className="text-cyan-400" />
                Contact Number
              </label>

              <input
                type="text"
                placeholder="Enter contact"
                className="w-full bg-transparent outline-none text-white text-base placeholder:text-slate-500"
              />
            </div>

            {/* FIELD 5 — Tags */}
            <div className="group bg-white/[0.03] border border-white/10 rounded-3xl px-5 py-4 hover:border-cyan-400/40 transition-all duration-300">
              <label className="flex items-center gap-2 text-xs uppercase tracking-[2px] text-slate-400 mb-3">
                <Tag size={18} className="text-cyan-400" />
                Tags
              </label>

              <input
                type="text"
                placeholder="Enter tags"
                className="w-full bg-transparent outline-none text-white text-base placeholder:text-slate-500"
              />
            </div>
          </div>
          BUTTONS
          <div className="mt-10 flex gap-4">
            {/* <button className="flex-1 py-4 rounded-xl bg-slate-800   cursor-pointer  text-blue-400  font-serif text-1xl   hover:bg-blue-500 transition hover:text-white border   border-blue-400`  hover:border-gray-600 ">
                            Save Changes
                        </button>
<div className='flex'>                    <button
                            className="px-6 rounded-xl border border-red-500/20 
            text-red-400 hover:bg-red-500 hover:text-white w-40  cursor-pointer transition"
                        >
                            Delete */}
            {/* <X size={15}/> */}
            {/* </button>
                        </div>
     */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
