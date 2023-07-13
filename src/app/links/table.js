'use client'

import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res)=>res.json());

export default function LinksHTMLTable() {
    const endpoint = "/api/links"
    const {data, error, isLoading} = useSWR(endpoint, fetcher, {refreshInterval: 1000})
    if (error) return "An error happened"
    if (isLoading) return "Loading..."
    return (
        <table>
            <tbody>
            {data && data.map((link, idx)=>{
                return <tr key={`link-item-${link.id}-${idx}`}>
                    <td>{link.id}</td>
                    <td>{link.url}</td>
                </tr>
            })}
            </tbody>
    </table>
    )


}