import React from 'react'
import { BsFillTelephoneFill}from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'
import {IoMdMail} from 'react-icons/io'
import {AiFillClockCircle} from 'react-icons/ai'

function Footer() {
  return (
   <> 
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-auto'>
        <div className="w-full bg-[#222026] rounded-sm p-8 text-center shadow-md">
        <div className='w-20 h-20 rounded-full bg-[#c97642] my-0 mx-auto  flex justify-center items-center'>
        <BsFillTelephoneFill color='white' size={30}  />
        </div>
        <div className="mt-4">
        <h3 className='capitalize text-2xl text-white'>Phone Number</h3>
        <p className='text-[#c97642] text-base'> +123 456 789 </p>
        <p className='text-[#c97642] text-base'> +987 654 321 </p>
        </div>
    </div>

    <div className="bg-[#222026] rounded-sm p-8 text-center shadow-md">
        <div className='w-20 h-20 rounded-full bg-[#c97642] my-0 mx-auto flex justify-center items-center'>
        <IoLocationSharp color='white' size={30}  />
        </div>
        <div className="mt-4">
        <h3 className='capitalize text-2xl text-white'>our Location</h3>
        <p className='text-[#c97642] text-base'> Zmaja od Bosne bb</p>
        </div>
    </div>

    <div className="bg-[#222026] rounded-sm p-8 text-center shadow-md">
        <div className='w-20 h-20 rounded-full bg-[#c97642] my-0 mx-auto flex justify-center items-center'>
        <AiFillClockCircle color='white' size={30}  />
        </div>
        <div className="mt-4">
        <h3 className='capitalize text-2xl text-white'>Opening Hours</h3>
        <p className='text-[#c97642] text-base'> 09:00 </p>
        <p className='text-[#c97642] text-base'> 21:00 </p>
        </div>
    </div>

    <div className="bg-[#222026] rounded-sm p-8 text-center shadow-md">
        <div className='w-20 h-20 rounded-full bg-[#c97642] my-0 mx-auto flex justify-center items-center'>
        <IoMdMail color='white' size={30}  />
        </div>
        <div className="mt-4">
        <h3 className='capitalize text-2xl text-white'>Our Mail</h3>
        <p className='text-[#c97642] text-base'> example@gmail.com </p>
        <p className='text-[#c97642] text-base'> example@gmail.com </p>
        </div>
    </div>
        </div>
   </>
  )
}

export default Footer