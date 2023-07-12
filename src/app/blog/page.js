// 'use client'
import getDomain from "@/app/lib/getDomain"

async function getData() {
    // 1 endpoint - API?
    const domain = getDomain()
    const endpoint = `${domain}/api/posts` // -> third party api request??
    const res = await fetch(endpoint) // HTTP GET

    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    if (res.headers.get("content-type") !== "application/json") {
        return {items: []}
    }
    return res.json()
}


export default async function BlogPage() {
    const data = await getData()
    const items = data && data.items ? [...data.items] : []
    console.log(items)
    console.log(process.env.NEXT_PUBLIC_VERCEL_URL)
    return <main>
        <h1>Hello World</h1>
        <p>Posts:</p>
        {items && items.map((item, idx)=>{
            return <li key={`post-${idx}`}>{item.title}</li>
        })}
    </main>
}