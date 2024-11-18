import React, { useEffect, useState } from 'react'

export default function useClient() {
    const [isClient, setIsClient] = useState(false);

    useEffect(()=> {
        setIsClient(typeof window === 'object');
        return () => {
            setIsClient(false);
        }
    },[])
  return isClient
}
