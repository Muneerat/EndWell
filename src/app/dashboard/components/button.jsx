import React from 'react'

export default function ButtonUpload({text,icon,}) {
  return (
   <button className='px-3 py-4 rounded-lg my-2 align-top items-start h-fit  disabled:cursor-not-allowed disabled:opacity-50 gap-x-5  flex  border-primary text-primary  border border-1'>
    <span>{icon}</span>
    {text}
   </button>
  )
}
