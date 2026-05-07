import React from 'react'
import { Laugh, EllipsisVertical  } from 'lucide-react'
const ChatHeader = () => {
    return (
        <div className="bg-slate-800 p-2 flex   ">


            <div className="p-3  h-12 ">
         
                <Laugh className="text-gray-600 cursor-pointer" size={30} />
            </div>

            <div>
                <p className="text-white ">Name of contacts</p>
                <h4 className="text-gray-600 ">Click here for contact Info </h4>
            </div>
            <div className=" flex   items-end justify-end">
                <EllipsisVertical
                    className=" text-gray-300  cursor-pointer m-2"
                    size={40}
                />
            </div>
        </div>
    )
}

export default ChatHeader
