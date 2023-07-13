'use client'

import useSWR from 'swr'
import LinksCreateForm from './createForm';

const fetcher = (url) => fetch(url).then((res)=>res.json());

export default function LinksHTMLTable() {
    const endpoint = "/api/links"
    const {data, error, isLoading, mutate} = useSWR(endpoint, fetcher)
    if (error) return "An error happened"
    if (isLoading) return "Loading..."
    const didSubmit = (newItem) => {
        mutate()
    }
    return <>
         <LinksCreateForm didSubmit={didSubmit} />
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
    </>


}