'use client'
import { useEffect, useState } from 'react'
import List from '../../../../components/list'
import { Pagination } from '@/components/pagination'

interface ModalitesLivraison {
    numero_livraison: number
    code_Don: number
    code_type_livraison: string
    date_prevue_livraison: Date
    adresse_enlevement: string
    civilite_contact_enlevement: string
    nom_contact_enlevement: string
    prenom_contact_enlevement: string
    telephone_contact_enlevement: string
    mail_contact_enlevement: string
    code_Prestataire_transporteur: number
    adresse_livraison: string
    civilite_contact_livraison: string
    nom_contact_livraison: string
    prenom_contact_livraison: string
    telephone_contact_livraison: string
    mail_contact_livraison: string
    nombre_palette_prevu: number
    nombre_palettes_consignees_prevu: number
    nombre_cartons_prevu: number
    poids_prevu_kg: number
    produits_sur_palettes: string
    temperature_conserv_produits: number
    commentaires: string
    pieces_associees: Blob
}

export default function ModalitesLivraisonPage({
    params,
}: {
    params: { donsID: string }
}) {
    const [ModalitesLivraisons, setModalitesLivraison] = useState<
        ModalitesLivraison[]
    >([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    useEffect(() => {
        const fetchModalitesLivraisons = async () => {
            const res = await fetch(
                `http://localhost:3000/api/dons/${params.donsID}/modalites-livraison?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const {
                data,
                total,
            }: { data: ModalitesLivraison[]; total: number } = await res.json()
            setModalitesLivraison(data)
            setTotalItems(total)
        }

        fetchModalitesLivraisons()
    }, [page, itemsPerPage, params.donsID])

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
                items={ModalitesLivraisons.map(ModalitesLivraison => ({
                    value1: ModalitesLivraison.numero_livraison.toString(),
                    value2: ModalitesLivraison.code_Don.toString(),
                    value3: ModalitesLivraison.date_prevue_livraison
                        .toString()
                        .split('T')[0],
                    value4: ModalitesLivraison.telephone_contact_enlevement.toString(),
                    value5: ModalitesLivraison.mail_contact_enlevement.toString(),
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
