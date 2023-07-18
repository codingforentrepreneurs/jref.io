// 'use client'

async function getData() {
    // 1 endpoint - API?
    // const endpoint = "http://localhosts:3000/api/posts" // -> third party api request??
    // const res = await fetch(endpoint) // HTTP GET

    // if (!res.ok) {
    //     throw new Error("Failed to fetch data")
    // }
    // return res.json()
    return {items: []}
}


export default async function BlogPage() {
    const data = await getData()
    const items = data && data.items ? [...data.items] : []
    return <main>
        <h1>Hello World</h1>
        <p>Posts:</p>
        {items && items.map((item, idx)=>{
            return <li key={`post-${idx}`}>{item.title}</li>
        })}
    </main>
}