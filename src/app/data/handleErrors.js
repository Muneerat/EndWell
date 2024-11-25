import React from 'react'

export default function handleErrors(error,setErrors) {
 if (error.response && (error.response?.status == 400) ) {
        if(typeof error.response.data.message === 'string'){
        //  console.log({email:  error.response.data.message});
         
         setErrors({email:  error.response.data.message})
       }else{
         let newErrors = {};
 
         for (let err in error.response.data.message) {
           newErrors[err] = error.response.data.message[err];
         }
        //  console.log(error.response.data.message);
          setErrors(newErrors);

       }
}}
