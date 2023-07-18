import getDomain from "@/app/lib/getDomain"
import { NextResponse } from "next/server"

export const runtime = "edge"

export async function GET(request) {
    return NextResponse.json({"url": getDomain()})
}