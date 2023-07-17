'use client'

import {useState} from 'react'

export default function LoginForm ({didSubmit}) {
    const [results, setResults] = useState(null)

    const handleForm = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        const JSONData = JSON.stringify(data)
        const endpoint = "/api/auth/login/"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSONData
        }
        const response = await fetch(endpoint, options)
        if (response.status === 200) {
            window.location.href="/"
        }
        const result = await response.json()

        setResults(result)
        if (didSubmit) {
            didSubmit(result)
        }
    }

    return <>
        <form onSubmit={handleForm}>
            <input type="text" name="username" placeholder="Your username"/>


            <input type="password" name="password" placeholder="Your password"/>

         

            <button type="submit">Login</button>

        </form>
        {results && JSON.stringify(results)}
    </>
}