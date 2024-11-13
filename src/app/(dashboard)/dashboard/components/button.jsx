import Link from "next/link";
// import React from "react";

export default function ButtonUpload({ text, icon, link = "", className }) {
  return (
    <Link href={link} className="w-full md:w-fit">
      <button
        className={`md:px-3 w-full px-1 py-4 rounded-lg my-2 align-top items-center h-fit md:mx-3 disabled:cursor-not-allowed disabled:opacity-50 md:gap-x-5 gap-x-1  flex  border-primary text-primary  border border-1 ${className}`}
      >
        <span>{icon}</span>
        <span className="p-0 !m-0">{text}</span>
      </button>
    </Link>
  );
}
