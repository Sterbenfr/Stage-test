'use client'
import { useEffect, useState } from 'react'
import List from '@/components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'

export interface Interactions {
    code_Utilisateur_Prospecteur: number
    code_Entite_Prospectee: number
    date_interaction: Date
    code_type_interaction: string
    code_modalite_interaction: string
    code_contact_entite: number
    commentaires: string
    pieces_associees: Blob
    date_relance: Date
}

function InteractionsPage() {
    const [Interactions, setInteractions] = useState<Interactions[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchInteractions = async () => {
            const res = await fetch(
                `http://localhost:3000/api/interactions?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Interactions[]; total: number } =
                await res.json()
            setInteractions(data)
            setTotalItems(total) // set the total items
        }

        fetchInteractions()
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
                items={Interactions.map(Interactions => ({
                    value1: Interactions.code_Entite_Prospectee.toString(),
                    value2: Interactions.date_interaction
                        .toString()
                        .split('T')[0],
                    value3: Interactions.code_contact_entite.toString(),
                    value4: Interactions.date_relance.toString().split('T')[0],
                    value5: Interactions.commentaires,
                }))}
                functions={{
                    fonc1: () => {
                        isPopUpOpen ? setIsPopUpOpen(false) : setIsPopUpOpen(true)
                    },
                    fonc2: () => {
                        console.log('fonc2')
                    },
                }}
            />
            <Pagination
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange} // pass the new prop here
                totalItems={totalItems} // use the total items from the state
                itemsPerPage={itemsPerPage}
                currentPage={page}
            />
            {''}
            {isPopUpOpen && (
                <PopUp
                    onClose={handleClose}
                    url='http://localhost:3000/api/interactions'
                    fields={[
                        {
                            id: 'code_Utilisateur_Prospecteur',
                            type: 'search',
                            value: null,
                            url: '../api/select/sites/utilisateurs',
                        },
                        {
                            id: 'code_Entite_Prospectee',
                            type: 'search',
                            value: null,
                            url: '../api/select/societe/entite',
                        },
                        { id: 'date_interaction', type: 'date', value: null },
                        {
                            id: 'code_type_interaction',
                            type: 'select',
                            value: null,
                            url: '../api/dons/type-interactions',
                        },
                        {
                            id: 'code_modalite_interaction',
                            type: 'select',
                            value: null,
                            url: '../api/dons/type-modalite-interactions',
                        },
                        {
                            id: 'code_contact_entite',
                            type: 'input',
                            value: null,
                        }, //remplissage auto
                        { id: 'commentaires', type: 'input', value: null },
                        { id: 'pieces_associees', type: 'file', value: null },
                        { id: 'date_relance', type: 'date', value: null },
                    ]}
                />
            )}
        </>
    )
}

export default withAuthorization(InteractionsPage, ['AD', 'PR'])
