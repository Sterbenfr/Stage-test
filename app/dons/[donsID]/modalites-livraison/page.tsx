'use client'
import { useEffect, useState } from 'react'
import List from '../../../../components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'
import style from '../../../../styles/components.module.css'

export interface ModalitesLivraison {
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
    nombre_palettes_prevu: number
    nombre_palettes_consignees_prevu: number
    nombre_cartons_prevu: number
    poids_prevu_kg: number
    produits_sur_palettes: string
    temperature_conserv_produits: number
    commentaires: string
    pieces_associees: Blob
}

function ModalitesLivraisonPage({ params }: { params: { donsID: string } }) {
    const [ModalitesLivraisons, setModalitesLivraison] = useState<
        ModalitesLivraison[]
    >([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchModalitesLivraisons = async () => {
            const res = await fetch(
                `http://localhost:3000/api/dons/${params.donsID}/modalites-livraison?page=${page}&limit=${itemsPerPage}`,
            )

            if (!res.ok) {
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
            <div className={style.page}>
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
                    functions={{
                        fonc1: () => {
                            isPopUpOpen
                                ? setIsPopUpOpen(false)
                                : setIsPopUpOpen(true)
                        },
                        url: `http://localhost:3000/api/dons/${params.donsID}/modalites-livraison`,
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
                    <div className={style.PopUp}>
                        <PopUp
                            onClose={handleClose}
                            url={`http://localhost:3000/api/dons/${params.donsID}/modalites-livraison`}
                            fields={[
                                {
                                    id: 'numero_livraison',
                                    type: 'number',
                                    value: null,
                                },
                                {
                                    id: 'code_Don',
                                    type: 'search',
                                    value: null,
                                    url: '../../api/select/dons/select-dons',
                                },
                                {
                                    id: 'code_type_livraison',
                                    type: 'select',
                                    value: null,
                                    url: `../../api/dons/${params.donsID}/modalites-livraison/type-livraison`,
                                },
                                {
                                    id: 'date_prevue_livraison',
                                    type: 'date',
                                    value: null,
                                },
                                {
                                    id: 'heure_prevue_livraison',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'adresse_enlevement',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'civilite_contact_enlevement',
                                    type: 'select',
                                    value: null,
                                    url: '../../api/select/genre',
                                },
                                {
                                    id: 'nom_contact_enlevement',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'prenom_contact_enlevement',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'telephone_contact_enlevement',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'mail_contact_enlevement',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'code_Prestataire_transporteur',
                                    type: 'search',
                                    value: null,
                                    url: '../api/select/prestataire',
                                },
                                {
                                    id: 'adresse_livraison',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'civilite_contact_livraison',
                                    type: 'select',
                                    value: null,
                                    url: '../../api/select/genre',
                                },
                                {
                                    id: 'nom_contact_livraison',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'prenom_contact_livraison',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'telephone_contact_livraison',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'mail_contact_livraison',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'nombre_palettes_prevu',
                                    type: 'number',
                                    value: null,
                                },
                                {
                                    id: 'nombre_palettes_consignees_prevu',
                                    type: 'number',
                                    value: null,
                                },
                                {
                                    id: 'nombre_cartons_prevu',
                                    type: 'number',
                                    value: null,
                                },
                                {
                                    id: 'poids_prevu_kg',
                                    type: 'number',
                                    value: null,
                                },
                                {
                                    id: 'produits_sur_palettes',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'temperature_conserv_produits',
                                    type: 'number',
                                    value: null,
                                },
                                {
                                    id: 'commentaires',
                                    type: 'input',
                                    value: null,
                                },
                                {
                                    id: 'pieces_associees',
                                    type: 'file',
                                    value: null,
                                },
                            ]}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default withAuthorization(ModalitesLivraisonPage, ['AD', 'PR'])
