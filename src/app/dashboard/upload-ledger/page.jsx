'use client'
import React, { useState } from 'react'
import UploadFile from '../components/upload'
import Button from '@/app/components/Button';

export default function UploadLedger() {

  const [file, setFile] = useState(null);
  return (
    <div className='px-6 py-10'>
        <div className='flex items-center gap-4'>
           <p>Back</p>
           <h1 className="font-bold text-2xl">Upload Ledger</h1>
        </div>
        <div className='bg-white flex flex-col justify-center my-20 p-10 w-4/6 mx-auto items-center'>
          <h1>fg</h1>
          <UploadFile 
           setFile={setFile}
           files={file}
           accept="audio/*,image/*"/>
           <Button className="w-2/6 my-10">
             Save
           </Button>
        </div>
    </div>
  )
}
