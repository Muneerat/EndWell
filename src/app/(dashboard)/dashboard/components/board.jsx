// import React from '';

export default function BoardFilter({text,children}) {
  return (
    <div className=' shadow-md flex md:flex-row flex-col gap-3 justify-between m-6 p-3 px-6 border'>
        <h1 className='font-bold lg:text-3xl md:text-xl text-lg text-center flex items-center'>{text}</h1>
        <div>
            {children}
        </div>
    </div>
  )
}
