import { NextResponse } from 'next/server'


export async function POST(request) {
    // using standard HTML form
    // const formData = await request.formData()
    // console.log(formData)
    const contentType = await request.headers.get("content-type")
    if (contentType !== "application/json") {
        return NextResponse.json({"error": "Invalid request"}, {status: 400})
    }
    const data = await request.json()
    return NextResponse.json(data, {status: 201})
}