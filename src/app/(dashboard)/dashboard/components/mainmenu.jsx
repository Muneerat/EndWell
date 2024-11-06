import { Hamburger } from "@/assets/icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import TextInput from "../../../components/TextInput";
import React from "react";
10
export default function MainMenu() {
  return (
    <div className="flex justify-between items-center w-full  shadow-sm px-4 py-3  bg-white m-auto md:pr-20 left-0 fixed  z-40 top-0 flex-shrink-0 sm:pl-[280px]" >
      <div className="bg-[#D9D9D9] p-2 rounded-full invisible ">
        <Hamburger />
      </div>
      <div className="w-full flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Hello Osas,</h1>
        <input
          type="text"
          className={`hidden  outline-none rounded-lg shadow-sm focus:outline-1 focus:ring-0 px-2 py-3 my-1 mx-2 md:block w-full md:w-3/6 placeholder:text-sm bg-[#F0F0F0]`}
          id="text"
          maxLength="255"
          placeholder="Search anything...."
        />
      </div>
      <div className="">
        <Avatar className="w-12 h-12 border-[#000680] border-2 rounded-full">
          <AvatarImage src="https://github.com/shadcn.png"  />
          
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
