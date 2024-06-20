'use client'
import { useEffect, useState } from 'react'
import List from '../../components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'


export interface Don {
    code_Don: number
    code_Entite_donatrice: number
    date_proposition_don: Date
    code_contact_Entite_donatrice: number
    code_type_don: string
    code_type_competences: string
    code_type_produits: string
    code_mode_conservation_produits: string
    date_debut_mise_disposition: Date
    date_fin_mise_disposition: Date
    commentaires: string
    pieces_associees: Blob
    code_Utilisateur_saisie_don: number
    statut_acceptation_don: string
    date_acceptation_refus_don: Date
    type_date_acceptation_refus: string
    code_Utilisateur_accepte_refuse_don: number
    code_site_beneficiaire_don: number
    indicateur_remerciement: string
    date_remerciement: Date
}

export default function DonsPage() {
    const [Dons, setDons] = useState<Don[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const handleClose = () => {
        setIsPopUpOpen(false);
    };

    useEffect(() => {
        const fetchDons = async () => {
            const res = await fetch(
                `http://localhost:3000/api/dons?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Don[]; total: number } =
                await res.json()
            setDons(data)
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
                items={Dons.map(Don => ({
                    value1: Don.code_Don.toString(),
                    value2: Don.code_Entite_donatrice ? Don.code_Entite_donatrice.toString() : '',
                    value3: Don.date_proposition_don.toString().split('T')[0],
                    value4: Don.commentaires ? Don.commentaires : '',
                    value5: Don.statut_acceptation_don ? Don.statut_acceptation_don : '',
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
            <button onClick={() => setIsPopUpOpen(true)}>Open PopUp</button>
                {isPopUpOpen && (
                    <PopUp
                        onClose={handleClose}
                        url='http://localhost:3000/api/dons'
                        fields={[
                            {
                                id: "code_Entite_donatrice", type: 'select',
                                value: null,
                                url:'../api/select/societe/entite'
                            },
                            { id: "date_proposition_don", type: 'date', value: null},
                            { id: "code_contact_Entite_donatrice", type: 'number', value: null}, //remplissage auto
                            { id: "code_type_don", type: 'input', value: null}, // deroulant
                            { id: "code_type_competences", type: 'input', value: null},//deroulant
                            { id: "code_type_produits", type: 'input', value: null},//deroulant
                            { id: "code_mode_conservation_produits", type: 'input', value: null},//deroulant
                            { id: "date_debut_mise_disposition", type: 'date', value: null},
                            { id: "date_fin_mise_disposition", type: 'date', value: null},
                            { id: "commentaires", type: 'input', value: null},
                            { id: "pieces_associees", type: 'file', value: null}, //type blob ?
                            { id: "code_Utilisateur_saisie_don", type: 'number', value:  null},
                            { id: "statut_acceptation_don", type: 'input', value: null}, //enum
                            { id: "date_acceptation_refus_don", type: 'date', value: null},
                            { id: "type_date_acceptation_refus", type: 'input', value: null},//enum
                            { id: "code_Utilisateur_accepte_refuse_don", type: 'input', value: null}, //deroulant
                            { id: "code_site_beneficiaire_don", type: 'number', value: null},
                            { id: "indicateur_remerciement", type: 'input', value: null},//enum
                            { id: "date_remerciement", type: 'date', value: null},//depend de si envoyé
                        ]}
                    />
                )}
            </>
    )
}
