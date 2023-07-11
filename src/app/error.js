'use client'

import { useEffect } from 'react'


export default function Error({ error, reset }) {
    useEffect(()=>{
        console.log("error is", error)
    }, [error])

    const retryRequestHandler = () => {
        reset()
    }

    return <div>
        <h2>Something went wrong!</h2>
        <button onClick={retryRequestHandler}>Retry request</button>
    </div>
}