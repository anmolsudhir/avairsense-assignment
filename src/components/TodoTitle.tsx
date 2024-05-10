import React from 'react'
import { IoMdMenu } from 'react-icons/io'

function TodoTitle() {
  return (
    <div className="bg-[#af7eea] w-full text-white flex p-4 ">
      <IoMdMenu className="cursor-pointer w-fit" size={24} />
      <span className="w-full basis-5/6 text-center">
        Website Todo
      </span>
    </div>
  )
}

export default TodoTitle