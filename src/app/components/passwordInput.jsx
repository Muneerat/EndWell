import React, { useState } from "react";
import Label from "./label";
import { EyeClosedIcon, EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import ErrorMessage from "./errorMessage";


export default function PasswordInput({
  label,
  wrapperClassNames,
  className,
  suffix,
  errorMessage = null,
  ...props
}) {

  const [type, setType] = useState('password')
  return (
    <div className={`relative ${wrapperClassNames}`}>
      <button
        type="button"
        className="inline-flex absolute right-3 inset-y-11 text-base-600 z-10"
        onClick={() => setType(type == 'password' ? 'text' : 'password')}
      >
       {type == 'password' ? <EyeOpenIcon className="h-5 w-5"/> : <EyeNoneIcon className="h-5 w-5" />}
      </button>
      <Label text={label} />
      <input
        type={type}
        className={`border border-1 outline-none rounded-md shadow-sm focus:outline-1 focus:ring-0 px-2 py-3 my-1 block w-full placeholder:text-sm ${className}`}
        {...props}
      />
      <ErrorMessage error={errorMessage} />
    </div>
  );
}
