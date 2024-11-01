import React from 'react'

export default function Label({
    text,
    className,
    ...props
}) {
  return (
    <label className={'my-1 text-sm ${className}'} {...props}>
        {text}
    </label>
  )
}
