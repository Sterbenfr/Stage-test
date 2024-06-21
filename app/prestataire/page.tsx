'use client'
import { useEffect, useState } from 'react'
import List from '../../components/list'
import { Pagination } from '@/components/pagination'
import withAuthorization from '@/components/withAuthorization'
interface Prestataire {
    code_Prestataire: number
    code_type_de_Prestataire: string
    raison_sociale: string
    nom_commercial: string
    Siren: string
    Siret: string
    telephone: string
    mail: string
    adresse: string
    civilite_contact_prestataire: string
    nom_contact_prestataire: string
    prenom_contact_prestataire: string
    telephone_contact_prestataire: string
    mail_contact_prestataire: string
    commentaires: string
    date_arret_activite_du_prestataire: Date
}

function PrestatairesPage() {
    const [Prestataires, setPrestataires] = useState<Prestataire[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)
    useEffect(() => {
        const fetchDons = async () => {
            const res = await fetch(
                `http://localhost:3000/api/prestataire?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Prestataire[]; total: number } =
                await res.json()
            setPrestataires(data)
            setTotalItems(total) // set the total items
        }

        fetchDons()
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
                items={Prestataires.map(Prestataire => ({
                    value1: Prestataire.code_Prestataire.toString(),
                    value2: Prestataire.raison_sociale.toString(),
                    value3: Prestataire.telephone.toString(),
                    value4: Prestataire.mail.toString(),
                    value5: Prestataire.telephone_contact_prestataire.toString(),
                    value6: Prestataire.mail_contact_prestataire.toString(),
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

export default withAuthorization(PrestatairesPage, ['AD', 'PR'])
