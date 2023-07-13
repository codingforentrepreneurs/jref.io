import { NextResponse } from 'next/server'

import isValidURL from '@/app/lib/isValidURL'
import {addLink} from "@/app/lib/db"

export async function POST(request) {
    // using standard HTML form
    // const formData = await request.formData()
    // console.log(formData)
    const contentType = await request.headers.get("content-type")
    if (contentType !== "application/json") {
        return NextResponse.json({"error": "Invalid request"}, {status: 415})
    }
    const data = await request.json()
    const url = data && data.url ? data.url : null
    const validURL = await isValidURL(url, ["jref.io", "jref-io.vercel.app", process.env.NEXT_PUBLIC_VERCEL_URL])
    if (!validURL) {
        return NextResponse.json({"message": `${url} is not valid.`}, {status: 400})
    }
    const dbResponse = await addLink(url)
    return NextResponse.json(dbResponse, {status: 201})
}