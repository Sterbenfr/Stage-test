'use client'
import { useEffect, useState } from 'react'
import List from '../../../../components/list'
import { Pagination } from '@/components/pagination'

interface Reception {
    numero_reception: number
    code_Don: number
    numero_BL: number
    date_reception: Date
    heure_reception: string
    nombre_palettes_recues: number
    nombre_palettes_consignees_recues: number
    nombre_palettes_consignees_rendues: number
    nombre_cartons_recus: number
    poids_recu_kg: number
    produits_sur_palettes: string
    commentaires: string
    pieces_associees: Blob
}

export default function ReceptionsPage(params: { donsID: string }) {
    const [Receptions, setReceptions] = useState<Reception[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)
    useEffect(() => {
        const fetchDons = async () => {
            const res = await fetch(
                `http://localhost:3000/api/dons/${params.donsID}/reception?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Reception[]; total: number } =
                await res.json()
            setReceptions(data)
            setTotalItems(total) // set the total items
        }

        fetchDons()
    }, [page, itemsPerPage, params.donsID])

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
                items={Receptions.map(Reception => ({
                    value1: Reception.numero_reception.toString(),
                    value2: Reception.code_Don.toString(),
                    value3: Reception.date_reception.toString().split('T')[0],
                    value4: Reception.nombre_palettes_recues.toString(),
                    value5: Reception.poids_recu_kg.toString(),
                }))}
            />
            <Pagination
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange} // pass the new prop here
                totalItems={totalItems} // use the total items from the state
                itemsPerPage={itemsPerPage}
                currentPage={page}
            />
            {''}
        </>
    )
}
