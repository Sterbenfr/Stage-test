'use client'
import { useEffect, useState } from 'react'
import List from '@/components/list'
import { Pagination } from '../../components/pagination'

interface Sites {
    code_site: number
    designation_longue: string
    designation_courte: string
    adresse: string
    code_type_site: string
    date_ouverture: Date
    date_fermeture: Date
    numero_telephone: string
    adresse_mail: string
    commentaire: string
}

export default function SitesPage() {
    const [Sites, setSites] = useState<Sites[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    useEffect(() => {
        const fetchSites = async () => {
            const res = await fetch(
                `http://localhost:3000/api/sites?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Sites[]; total: number } =
                await res.json()
            setSites(data)
            setTotalItems(total) // set the total items
        }

        fetchSites()
    }, [page, itemsPerPage])
    // add a function to handle page changes
    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage)
        setPage(1) // reset page to 1 when items per page changes
    }

    return (
        <>
            <List
                items={Sites.map(Sites => ({
                    value1: Sites.designation_longue.toString(),
                    value2: Sites.adresse.toString(),
                    value3: Sites.date_ouverture.toString().split('T')[0],
                    value4: Sites.numero_telephone.toString(),
                    value5: Sites.adresse_mail.toString(),
                }))}
            />
            <Pagination
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange} // pass the new prop here
                totalItems={totalItems} // use the total items from the state
                itemsPerPage={itemsPerPage}
                currentPage={page}
            />{' '}
        </>
    )
}
