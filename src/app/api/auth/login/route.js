import { NextResponse } from 'next/server'
import {getUserByUsername} from "@/app/lib/db"
import { isMatchingPassword } from '@/app/lib/passwordUtils'

import { setSessionUser } from '@/app/lib/session'


export async function POST(request) {
    // using standard HTML form
    // const formData = await request.formData()
    // console.log(formData)
    const contentType = await request.headers.get("content-type")
    if (contentType !== "application/json") {
        return NextResponse.json({"error": "Invalid request"}, {status: 415})
    }
    const data = await request.json()
    const {username, password} = data

    const isValidData = (username && password)
    if (!isValidData) {
        return NextResponse.json({"message": `Username and password are required.`}, {status: 400})
    }
    const dbResponse = await getUserByUsername(username)
    if (!dbResponse) {
        return NextResponse.json({"message": `Invalid creds.`}, {status: 400})
    }
    const userRecord = dbResponse[0]
    if (!userRecord) {
        return NextResponse.json({"message": `Invalid creds.`}, {status: 400})
    }
    const userRecordId = userRecord.id
    const storedUserHash = userRecord.password
    if (!userRecordId && !storedUserHash) {
        return NextResponse.json({"message": `Invalid creds.`}, {status: 400})
    }
    const isValidPasswordRequest = await isMatchingPassword(password, storedUserHash)
    if (!isValidPasswordRequest) {
        return NextResponse.json({"message": `Invalid creds, please try again.`}, {status: 400})
    }
    await setSessionUser(userRecordId)
    return NextResponse.json({}, {status: 200})
}