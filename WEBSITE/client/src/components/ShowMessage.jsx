import React, { useRef, useState } from 'react'
import { CiEdit } from "react-icons/ci";

export default function ShowMessage({ data }) {
    const [isShow, setIsShow] = useState(false);

    const handleMouseEnter = () => {
        setIsShow(!isShow);
    }

    return (
        <div className='w-full p-2'>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseEnter} className="flex justify-end items-center gap-2">
                <button className={`w-10 h-10 flex justify-center items-center bg-blue-100 transition-all duration-300 rounded-full ${isShow ? 'opacity-100' : 'opacity-0'}`}><CiEdit className='text-xl' /></button>
                <div className="inputBox max-w-[60%] p-4 bg-blue-300 rounded-xl my-2">
                    {data.input}
                </div>
            </div>
            {data.file != '' && (
                <div className="flex justify-end items-center gap-2">
                    <div className="w-20 h-20 overflow-hidden border-2 rounded-md">
                        <img src={data.file} alt="" className="w-full h-full object-contain" />
                    </div>
                </div>
            )}
            <div className="flex justify-start my-2">
                <div className="outputBox max-w-[60%] p-4 bg-yellow-200 rounded-xl">
                    {data.output}
                </div>
            </div>
        </div>
    )
}