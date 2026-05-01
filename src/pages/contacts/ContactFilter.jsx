import React, { useState, useRef, useEffect } from 'react'

const ContactFilter = ({ setFilterField, setFilterValue, close }) => {
    const [field, setField] = useState('')
    const [value, setValue] = useState('')

    const filterRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                close()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [close])

    return (
        <>
            <div className="fixed inset-0 bg-black/20 " onClick={close} />
            <div
                ref={filterRef}
                className=" text-gray-600   p-4 rounded-lg shadow-lg  relative z-50"
            >
                <h1 className="font-bold">Filter Contact</h1>

                <hr />
                <div className="flex">
                    <select
                        className="border p-3 m-2 w-36 font-bold rounded-lg cursor-pointer"
                        onChange={(e) => setField(e.target.value)}
                    >
                        <option>Select</option>
                        <option value="name">Name</option>
                        <option value="phoneNumber">Phone Number</option>
                        <option value="tag">Tags</option>
                        <option value="email">Email</option>
                    </select>

                    {field && (
                        <input
                            className="border p-2 w-40 m-2 font-bold rounded-lg cursor-pointer"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter value"
                        />
                    )}
                </div>
                <div className="flex gap-2 mt-3">
                    <button
                        className="flex-1   border rounded-lg bg-white hover:bg-red-500 hover:text-white text-black border-black  hover:border-blue-400  cursor-pointer"
                        onClick={close}
                    >
                        Cancel
                    </button>
                    <button
                        className="flex-1 border p-2 rounded-lg bg-blue-500 h-12  text-black  cursor-pointer hover:bg-black hover:text-white "
                        onClick={() => {
                            if (!field || !value) {
                                return
                            }
                            setFilterField(field)
                            setFilterValue(value)
                            close()
                        }}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </>
    )
}

export default ContactFilter
