'use client'
import { useEffect, useState } from 'react'
import List from '../../components/list'
import { Pagination } from '@/components/pagination'

interface Cerfa {
    numero_Cerfa: number
    code_Don: number
    montant_HT_Cerfa: number
    date_realisation_Cerfa: Date
    date_envoi_Cerfa: Date
    addresse_Cerfa: string
    civilite_destinataire_Cerfa: string
    nom_destinataire_Cerfa: string
    prenom_destinataire_Cerfa: string
    telephone_destinataire_Cerfa: string
    mail_destinataire_Cerfa: string
}

export default function CerfaPage() {
    const [cerfas, setCerfa] = useState<Cerfa[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    useEffect(() => {
        const fetchCerfas = async () => {
            const res = await fetch(
                `http://localhost:3000/api/cerfa?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Cerfa[]; total: number } =
                await res.json()
            setCerfa(data)
            setTotalItems(total) // set the total items
        }

        fetchCerfas()
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
        <div>
            <>
                <h1>Cerfas</h1>
                <List
                    items={cerfas.map(cerfa => ({
                        value1: cerfa.numero_Cerfa.toString(),
                        value2: cerfa.code_Don.toString(),
                        value3: cerfa.montant_HT_Cerfa.toString(),
                        value4: cerfa.nom_destinataire_Cerfa.toString(),
                        value5: cerfa.prenom_destinataire_Cerfa.toString(),
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
        </div>
    )
}
