import { NextResponse } from 'next/server'
import {registerUser} from "@/app/lib/db"

// import { setSessionUser } from '@/app/lib/session'


export async function POST(request) {
    // using standard HTML form
    // const formData = await request.formData()
    // console.log(formData)
    const contentType = await request.headers.get("content-type")
    if (contentType !== "application/json") {
        return NextResponse.json({"error": "Invalid request"}, {status: 415})
    }
    const data = await request.json()
    const {username, password, passwordConfirm} = data
    if (password !== passwordConfirm) {
        return NextResponse.json({"message": `Passwords must match. Please try again..`}, {status: 400})
    }

    const isValidData = (username && password)
    if (!isValidData) {
        return NextResponse.json({"message": `Username and password are required.`}, {status: 400})
    }
    const toSaveData = {
        username: data.username,
        password: data.password
    }
    if (data.email) {
        toSaveData["email"] = data.email
    }
    const dbResponse = await registerUser(toSaveData)
    const responseData = dbResponse && dbResponse.data ? dbResponse.data : {}
    const responseStatus = dbResponse && dbResponse.status ? dbResponse.status : 500
    return NextResponse.json(responseData, {status: responseStatus})
}