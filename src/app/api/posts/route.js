import { NextResponse } from 'next/server'


export async function GET() {
    return NextResponse.json({items: [
        {id:1, title:"Hello World"},
        {id:2, title:"Hello again"},
        {id:3, title:"Hello ddss"},
        
    ]})
}

// export async function POST() {
//     // FORM DATA
//     // API JSON POST DATA
//     return NextResponse.json({hello: "abc"})
// }