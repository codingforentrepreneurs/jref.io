'use client'

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
        <form onSubmit={handleForm}>
            <div>Are you sure you want to logout?</div>

            <button type="submit">Yes, continue</button>
            <Link href='/'>No, go home.</Link>
        </form>
        
    </>
}