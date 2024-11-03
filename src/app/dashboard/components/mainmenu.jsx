import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import TextInput from "../../components/TextInput";
import React from "react";
10
export default function MainMenu() {
  return (
    <div className="flex justify-between items-center w-full shadow-sm px-5 py-3 fixed bg-white opacity-">
      <div className="w-full flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Hello Osas,</h1>
        <input
          type="text"
          className={` outline-none rounded-lg shadow-sm focus:outline-1 focus:ring-0 px-2 py-3 my-1 mx-2 block w-full md:w-3/6 placeholder:text-sm bg-[#F0F0F0]`}
          id="text"
          maxLength="255"
          placeholder="Search anything...."
        />
      </div>
      <div className="">
        <Avatar className="w-12 border-[#000680] border-2">
          <AvatarImage src="https://github.com/shadcn.png"  />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
