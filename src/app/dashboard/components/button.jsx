import Link from 'next/link'
import React from 'react'

export default function ButtonUpload({text,icon,link="",className}) {
  return (
    <Link href={link}>
   <button className={`px-3 py-4 rounded-lg my-2 align-top items-center h-fit mx-3 disabled:cursor-not-allowed disabled:opacity-50 gap-x-5  flex  border-primary text-primary  border border-1 ${className}`}>
    <span>{icon}</span>
    {text}
   </button>
    </Link>
  )
}
