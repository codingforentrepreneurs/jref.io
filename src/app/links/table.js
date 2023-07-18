'use client'

import { Table } from 'flowbite-react';
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
         <Table>
            <Table.Head>
                <Table.HeadCell>
                ID
                </Table.HeadCell>
                <Table.HeadCell>
                URL
                </Table.HeadCell>
                <Table.HeadCell>
                Short Link
                </Table.HeadCell>
            </Table.Head>
        <Table.Body  className="divide-y">
            {data && data.map((link, idx)=>{
                return <Table.Row key={`link-${idx}`} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {link.id}
                    </Table.Cell>
                    <Table.Cell>
                        {link.url}
                    </Table.Cell>
                    <Table.Cell>
                        https://jref.io/{link.short}
                    </Table.Cell>
                
                </Table.Row>
            })}
        </Table.Body >
    </Table>

    </>
}