import React from "react";
import Label from "./label";
import ErrorMessage from "./errorMessage";

export default function TextInput({
  label,
  wrapperClassNames,
  className,
  type,
  suffix,
  errorMessage = null,
  ...props
}) {
  return (
    <div className={`relative ${wrapperClassNames}`}>
      <div>{suffix}</div>
      <Label text={label} />
      <input
        type={type}
        className={`border border-1 outline-none rounded-md shadow-sm focus:outline-1 focus:ring-0 px-2 py-3 my-1 block w-full placeholder:text-sm ${className}`}
        {...props}
      />
      <ErrorMessage error={errorMessage}/>
    </div>
  );
}
