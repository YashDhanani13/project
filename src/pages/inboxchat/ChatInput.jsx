import React from 'react'

const ChatInput = () => {
  return (
    <div>



      <input
        className='w-110 h-10 p-2 m-2  text-gray-400 bg-slate-600 rounded-2xl    '
        placeholder='Message'
        type="text" />

           <button className='bg-indigo-600 text-white  ' >
            <SendHorizontal size={18} />
           </button>

    </div>
  )
}

export default ChatInput