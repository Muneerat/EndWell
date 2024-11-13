import React from "react";
import Label from "./label";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export default function PasswordInput({
  label,
  wrapperClassNames,
  className,
  type,
  suffix,
  ...props
}) {
  return (
    <div className={`relative ${wrapperClassNames}`}>
      <button
        type="button"
        className="inline-flex absolute right-2 inset-y-8 text-base-600 z-10"
        onClick={() => setType(type === 'password' ? 'text' : 'password')}
      >
       {type == 'password' ? <EyeOpenIcon/> : <EyeClosedIcon />}
      </button>
      <Label text={label} />
      <input
        type={type}
        className={`border border-1 outline-none rounded-md shadow-sm focus:outline-1 focus:ring-0 px-2 py-3 my-1 block w-full placeholder:text-sm ${className}`}
        {...props}
      />
    </div>
  );
}
