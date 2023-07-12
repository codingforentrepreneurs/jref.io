import { NextResponse } from 'next/server'


export async function POST() {
    // FORM DATA
    // API JSON POST DATA
    return NextResponse.json({hello: "abc"})
}