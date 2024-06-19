'use client'
import { useEffect, useState } from 'react'
import List from '@/components/list'
import { Pagination } from '@/components/pagination'

interface Utilisateurs {
    code_utilisateur: number
    civilite: string
    nom: string
    prenom: string
    tel_perso: string
    mail_restos_du_coeur: string
    commentaires: string
}

export default function UtilisateursPage() {
    const [Utilisateurs, setUtilisateurs] = useState<Utilisateurs[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)
    useEffect(() => {
        const fetchUtilisateurs = async () => {
            const res = await fetch(
                `http://localhost:3000/api/sites/utilisateurs?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Utilisateurs[]; total: number } =
                await res.json()
            setUtilisateurs(data)
            setTotalItems(total) // set the total items
        }

        fetchUtilisateurs()
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
                items={Utilisateurs.map(user => ({
                    value1: user.code_utilisateur.toString(),
                    value2: user.civilite,
                    value3: user.nom,
                    value4: user.prenom,
                    value5: user.tel_perso,
                    value6: user.mail_restos_du_coeur,
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
