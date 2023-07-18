import {notFound, redirect} from 'next/navigation'
import {getShortLinkRecord} from "@/app/lib/db"
import getDomain from '../lib/getDomain'

export const runtime = "edge"

async function triggerVisit (linkId) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({linkId: linkId})
    }
    const domain = getDomain()
    const endpoint = `${domain}/api/visits/`
    return await fetch(endpoint, options)
}


export default async function ShortPage({params}) {
    const {short} = params
    if (!short) {
        notFound()
    }
    const [record] = await getShortLinkRecord(short)
    if (!record) {
        notFound() // 404
    }
    const {url, id} = record
    if (!url) {
        notFound()
    }
    let msg;
    if (id) {
        try {
            await triggerVisit(id)
        } catch ({name, message}) {
            msg=message
        }
        
    }
    return <div>
            <h1>>{url}</h1>
        {msg && msg}
        </div>
    // redirect(url, "push")
}