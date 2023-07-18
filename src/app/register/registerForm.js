'use client'

import {useState} from 'react'
import { Alert } from 'flowbite-react';
export default function RegisterForm ({didSubmit}) {
    const [results, setResults] = useState(null)
    const [message, setMessage] = useState(null)


    const handleForm = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        const JSONData = JSON.stringify(data)
        const endpoint = "/api/auth/register/"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSONData
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()
        console.log(result)
        setResults(result)

        if (didSubmit) {
            didSubmit(result)
        }
        if (result.message) {
            setMessage(result.message)
        }
    }

    return <>
        {message && <Alert color="warning">{message}</Alert>}
        <form onSubmit={handleForm}>
            <input type="text" name="username" placeholder="Pick a username"/>

            <input type="email" name="email" placeholder="Your email"/>

            <input type="password" name="password" placeholder="Your password"/>

            <input type="password" name="passwordConfirm" placeholder="Confirm your password"/>

            <button type="submit">Register</button>

        </form>
        
    </>
}