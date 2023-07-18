'use client'

import { Button } from 'flowbite-react'
import Link from 'next/link'

export default function LogoutForm ({didSubmit}) {

    const handleForm = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        const JSONData = JSON.stringify(data)
        const endpoint = "/api/auth/logout/"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSONData
        }
        const response = await fetch(endpoint, options)
        if (response.status === 200) {
            window.location.href="/login"
        }
    }

    return <>
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleForm}>
            <div>Are you sure you want to logout?</div>
       
            <Button className="mb-2" type="submit">Yes, continue</Button>
            <Button color="gray" href='/'>No, go home.</Button>
        </form>
        
    </>
}