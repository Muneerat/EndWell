import React from "react";

export default function Card({text,number}) {
  return (
    <div className="bg-[#E5EEFA] rounded-xl w-72 h-36 flex flex-col px-4 justify-center border-[#000680] text-secondary ">
      <p className="text-lg font-light">{text}</p>
      <h1 className="text-3xl font-bold">{number}</h1>
    </div>
  );
}
