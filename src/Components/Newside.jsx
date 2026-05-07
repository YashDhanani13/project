import React from 'react'

const Newside = () => {
  return (

    <div>
      <div className='bg-white h-50 w-70 '>

        <h2 className='text-black '>Messages</h2>


        <input
          className="bg-gray-100 w-50 p-2 m-2  text-gray-400 "
          type="search" placeholder='Search conversition...' />

      </div>
      {/* // side contact show here : -  */}

      <p className='h-12 w-12 rounded-4xl p-2 '>Profile icon</p>

      <div>
        <p>Contact Name</p>
        <p>time period message </p>
      </div>

      <div className='text-gray-300 '> {message}</div>
      <div className='bg-blue-600  rounded-full   text-white'> Numbert of  messaage count</div>
    </div>
  )
}

export default Newside;