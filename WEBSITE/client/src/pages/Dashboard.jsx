import React, { useEffect, useState } from 'react'
import Logo from "/images/logo.jpg";
import { BsFillBellFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { CiTempHigh } from "react-icons/ci";
import { IoWater } from "react-icons/io5";
import { PiPottedPlantFill } from "react-icons/pi";
import { BsCloudRainHeavyFill } from "react-icons/bs";
import { IoIosSunny } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <>
            {loading && (
                <div className="w-full h-screen absolute left-0 top-0 flex justify-center items-center bg-[#01D2A8] z-50">
                    <div className="border-8 border-t-8 border-t-white border-gray-300 rounded-full w-16 h-16 animate-spin"></div>
                </div>
            )}
            <div id='header' className="header w-full h-16 bg-[#9EFFE2] flex justify-between items-center px-2 sm:px-4">
                <Link to='/'>
                    <div className="flex gap-2 items-center">
                        <img src={Logo} alt="" className="w-12 h-12 bg-yellow-200 rounded-full object-cover" />
                        <img src="https://firebasestorage.googleapis.com/v0/b/yield-smart-web.appspot.com/o/website%20image%2Ftext%20image.png?alt=media&token=9a46ddf0-f1ef-4961-bcec-476b7ff3f630" alt="" className="h-10 sm:h-12" />
                    </div>
                </Link>
                <div className="flex gap-4 items-center sm:px-4">
                    <button className="p-2 rounded-full"><BsFillBellFill className='text-xl hidden sm:text-2xl sm:block text-[#00623D]' /></button>
                    <Link to='/profile' className="p-2 rounded-full bg-white"><FaUserAlt className='text-xl sm:text-2xl text-[#00623D]' /></Link>
                </div>
            </div>
            <div className="box1 h-44 mx-4 my-4 relative md:mx-8 sm:h-60 md:h-[40dvh] border border-black">
                <div className="absolute top-0 left-0 h-28 sm:h-40 md:h-44 lg:h-[80%] flex items-start gap-4">
                    <button onClick={() => console.log("top click")} className="w-auto h-auto border border-black">
                        <img src="https://firebasestorage.googleapis.com/v0/b/yield-smart-web.appspot.com/o/website%20image%2FGroup%208.png?alt=media&token=c67061d0-f928-4601-976d-6c608bc8021b" alt="" className="h-28 sm:h-44" />
                    </button>
                    <Link to='/chat' className="border border-black">
                        <img src="https://firebasestorage.googleapis.com/v0/b/yield-smart-web.appspot.com/o/website%20image%2Fmsg.png?alt=media&token=ec7bdd2b-07ab-4ace-94fe-a19206199ca0" alt="" className="h-12 sm:h-16 lg:h-20" />
                    </Link>
                </div>
                <Link to='/diagonasis' className="">
                    <img src="https://firebasestorage.googleapis.com/v0/b/yield-smart-web.appspot.com/o/website%20image%2Fdiagnosis.png?alt=media&token=5af84137-d49b-4b49-9088-7680ba6edf10" alt="" className="absolute bottom-0 right-0 h-28 sm:h-40 md:h-44 lg:h-[80%]" />
                </Link>
            </div>
            <div className="box2 py-6 px-8 sm:px-6 md:px-8">
                <h1 className="text-3xl py-2 font-semibold text-[#00623D] border-b-4 border-[#00623D]">Plant monitoring</h1>
                <div className="flex flex-col gap-4 py-4">
                    <div className="flex flex-col justify-center gap-6 sm:flex-row">
                        <div className="w-full bg-[#9EF4E6] rounded-md flex gap-2 items-center justify-around py-2 sm:w-[33%] lg:w-[25%] sm:flex-col sm:justify-normal">
                            <div className="">
                                <h2 className="text-lg text-center font-semibold md:text-2xl py-2">Temperature</h2>
                                <div className="flex gap-2 items-center justify-center">
                                    <CiTempHigh className='h-8 w-8 sm:h-12 sm:w-12 text-[#00623D]' />
                                    <p className="p-1 bg-white rounded-sm font-semibold sm:p-2">35&deg; C</p>
                                </div>
                            </div>
                            <div className="bg-white w-[50%] h-16 sm:h-28 sm:w-[60%]">
                                <img src="https://firebasestorage.googleapis.com/v0/b/yield-smart-web.appspot.com/o/website%20image%2FCombo%20Chart.png?alt=media&token=a25054da-497f-4627-aaf5-2c5de871c448" alt="" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div className="w-full bg-[#9EF4E6] rounded-md flex gap-2 items-center justify-around py-2 sm:w-[33%] lg:w-[25%] sm:flex-col sm:justify-normal">
                            <div className="">
                                <h2 className="text-lg text-center font-semibold md:text-2xl py-2">Humidity</h2>
                                <div className="flex gap-2 items-center justify-center">
                                    <IoWater className='h-8 w-8 sm:h-12 sm:w-12 text-blue-400' />
                                    <p className="p-1 bg-white rounded-sm font-semibold sm:p-2">82%</p>
                                </div>
                            </div>
                            <div className="bg-white w-[50%] h-16 sm:h-28 sm:w-[60%]">
                                <img src="https://firebasestorage.googleapis.com/v0/b/yield-smart-web.appspot.com/o/website%20image%2FCombo%20Chart.png?alt=media&token=a25054da-497f-4627-aaf5-2c5de871c448" alt="" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div className="w-full bg-[#9EF4E6] rounded-md flex gap-2 items-center justify-around py-2 sm:w-[33%] lg:w-[25%] sm:flex-col sm:justify-normal">
                            <div className="">
                                <h2 className="text-lg text-center font-semibold md:text-2xl py-2">Soil Moisture</h2>
                                <div className="flex gap-2 items-center justify-center">
                                    <PiPottedPlantFill className='h-8 w-8 sm:h-12 sm:w-12 text-green-500' />
                                    <p className="p-1 bg-white rounded-sm font-semibold sm:p-2">82%</p>
                                </div>
                            </div>
                            <div className="bg-white w-[50%] h-16 sm:h-28 sm:w-[60%]">
                                <img src="https://firebasestorage.googleapis.com/v0/b/yield-smart-web.appspot.com/o/website%20image%2FCombo%20Chart.png?alt=media&token=a25054da-497f-4627-aaf5-2c5de871c448" alt="" className="w-full h-full object-contain" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 py-4">
                        <div className="flex flex-col justify-center gap-6 sm:flex-row">
                            <div className="w-full bg-[#9EF4E6] rounded-md flex flex-col gap-2 px-2 py-2 sm:w-[33%] lg:w-[25%] sm:items-center sm:px-0">
                                <h2 className="text-lg font-semibold md:text-2xl sm:text-center py-2">Soil Nutrients</h2>
                                <ul className="flex gap-1 w-full sm:flex-col sm:gap-4 sm:w-[90%]">
                                    <li className="text-xs sm:text-base w-[33.3%] sm:w-full rounded-md bg-white py-2 px-2 sm:px-4"><span className='font-bold text-red-500'>N:</span> 82mg/kg</li>
                                    <li className="text-xs sm:text-base w-[33.3%] sm:w-full rounded-md bg-white py-2 px-2 sm:px-4"><span className='font-bold text-red-500'>N:</span> 82mg/kg</li>
                                    <li className="text-xs sm:text-base w-[33.3%] sm:w-full rounded-md bg-white py-2 px-2 sm:px-4"><span className='font-bold text-red-500'>N:</span> 82mg/kg</li>
                                </ul>
                            </div>
                            <div className="flex gap-2 w-full sm:gap-6 sm:w-[60%] lg:w-[52%]">
                                <div className="w-[48%] bg-[#9EF4E6] rounded-md flex flex-col gap-2 items-center py-2">
                                    <h2 className="text-lg font-semibold md:text-2xl sm:text-center py-2">UV</h2>
                                    <div className="w-[80%] bg-white h-12 rounded-md flex justify-center sm:h-32">
                                        <div className="flex items-center gap-1 sm:gap-2">
                                            <IoIosSunny className='text-2xl sm:text-3xl' />
                                            <h2 className="text-sm sm:text-base">Very Weak</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[48%] bg-[#9EF4E6] rounded-md flex flex-col gap-2 items-center py-2">
                                    <h2 className="text-lg font-semibold md:text-2xl sm:text-center py-2">Raining Status</h2>
                                    <div className="w-[80%] bg-white h-12 rounded-md flex justify-center sm:h-32">
                                        <div className="flex items-center gap-1 sm:gap-2">
                                            <BsCloudRainHeavyFill className='text-xl sm:text-2xl' />
                                            <h2 className="text-sm sm:text-base">Not Raining</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
