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
    <button className={`${className}  px-3 py-3 rounded-lg my-  items-center justify-center disabled:cursor-not-allowed disabled:opacity-50 gap-x-2 flex  bg-primary text-white`}>
        <Spinner spin={spin} isBase={false} />
        {children}
    </button>
  )
}
