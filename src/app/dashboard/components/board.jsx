import React from 'react'

export default function BoardFilter({text,children}) {
  return (
    <div className=' shadow-md flex justify-between m-6 p-4 border'>
        <h1 className='font-bold text-3xl text-center flex items-center'>{text}</h1>
        <div>
            {children}
        </div>
    </div>
  )
}
