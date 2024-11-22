// import React from "react";

export default function Card({text,number}) {
  return (
    <div className="bg-[#E5EEFA] rounded-lg w-full  flex flex-col px-5 py-3 gap-4 justify-center border-[#000680] text-secondary hover:translate-y-1 duration-200 transition-all hover:transform ">
      <p className="text-lg font-light">{text}</p>
      <h1 className="text-3xl font-bold">{number}</h1>
    </div>
  );
}
