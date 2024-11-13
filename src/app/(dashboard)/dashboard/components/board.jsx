// import React from '';

export default function BoardFilter({text,children}) {
  return (
    <div className=' shadow-md flex flex-row flex- gap-3 justify-between m-6 p-4 border'>
        <h1 className='font-bold md:text-3xl text-xl text-center flex items-center'>{text}</h1>
        <div>
            {children}
        </div>
    </div>
  )
}
