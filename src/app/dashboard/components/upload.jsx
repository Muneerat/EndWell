'use client'
import { Upload1 } from "@/assets/icon";
import { useState } from "react";
// import { HiCloudArrowUp } from "react-icons/hi2";

export default function UploadFile({
    setFile,
    files=null,
    className ='',
    ...props
}) {

    const [styles, setStyles] = useState('');

    const onDrop = e => {
        e.preventDefault();
        let files = e.dataTransfer.files;

        if (typeof setFile !== 'function') {
            throw new Error(`setFile must be a function. ${typeof setFile} given instead`);
        }
        setFile(files);
        setStyles('border-2 border-primary')
    }

    const onChange = e=> {
        let files = e.target.files;

        if (typeof setFile !== 'function') {
            throw new Error(`setFile must be a function. ${typeof setFile} given instead`);
        }
        setFile(files);
        setStyles('border-2 border-primary')
    }

    const onDragOver = e => {
        setStyles('bg-primary');
    }

    const onDragLeave = e => {
        setStyles('');
    }
    return (
        <>
            <label className={`flex flex-col cursor-pointer  items-center min-w- min-w-96 bg-[#F5F5F7] h-44 rounded-md justify-center p-4 relative ${styles} ${className}`}>
                <span className="w-5/6 text-center text-[#3E3E3E]">
                    {
                        files?.length > 0
                            ? files[0].name
                            : <Text />
                    }
                </span>
                <input
                    type="file"
                    onChange={onChange}
                    onDrop={onDrop}
                    onDragLeave={onDragLeave}
                    onDragOver={onDragOver}
                    {...props}
                    className="block h-full w-full absolute left-0 top-0 z-10 opacity-0"
                    
                />
            </label>
        </>
    )
}

export const Text = () => {
    return (
        <div className="" >
            <Upload1 className='flex justify-center items-center mx-auto my-5'/>
            <p>Drag and drop files here or click to <span className="text-primary !cursor-pointer">Browse</span> the computer</p>
        </div>
    )
}
