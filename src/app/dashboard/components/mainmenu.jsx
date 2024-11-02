import TextInput from "../../components/TextInput";
import React from "react";

export default function MainMenu() {
  return (
    <div className="flex justify-between w-full shadow-sm px-5 py-3 mb-3">
      <div className="w-full flex items-center gap-4">
        <h1 className="text-2xl font-semibold">Hello Osas,</h1>
        <input
        type="text"
        className={` outline-none rounded-md shadow-sm focus:outline-1 focus:ring-0 px-2 py-3 my-1 block w-full md:w-3/6 placeholder:text-sm bg-[#F0F0F0]`}
        id="text"
        maxLength="255"
        placeholder="Search anything...."
        
      />
      </div>
      <div>profile</div>
    </div>
  );
}
