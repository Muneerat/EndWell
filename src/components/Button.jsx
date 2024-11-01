import React from 'react'
import Spinner from './Spinner'

export default function Button({
    type="submit",
    children,
    className,
    spin=false,
   ...props
}) {
  return (
    <button className='px-3 py-2 rounded-lg my-5  items-center justify-center disabled:cursor-not-allowed disabled:opacity-50 gap-x-2 flex w-full bg-primary text-white'>
        <Spinner spin={spin} isBase={false} />
        {children}
    </button>
  )
}
