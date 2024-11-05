import React from 'react'

export default function Label({
    text,
   
    ...props
}) {
  return (
    <label className={'my-1 text-sm ${className}'} {...props}>
        {text}
    </label>
  )
}
