'use client'
import { useEffect, useState } from 'react'
import List from '../../components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'

export interface Cerfa {
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

function CerfaPage() {
    const [cerfas, setCerfa] = useState<Cerfa[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

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
                />{' '}
                {isPopUpOpen && (
                    <PopUp
                        onClose={handleClose}
                        url='http://localhost:3000/api/cerfa'
                        fields={[
                            {
                                id: 'numero_Cerfa',
                                type: 'number',
                                value: null,
                                url: '../api/select/cerfa',
                            },
                            {
                                id: 'code_Don',
                                type: 'number',
                                value: null,
                            },
                            {
                                id: 'montant_HT_Cerfa',
                                type: 'number',
                                value: null,
                            },
                            {
                                id: 'date_realisation_Cerfa',
                                type: 'date',
                                value: null,
                            },
                            {
                                id: 'date_envoie_Cerfa',
                                type: 'date',
                                value: null,
                            },
                            {
                                id: 'addresse_Cerfa',
                                type: 'input',
                                value: null,
                            },
                            {
                                id: 'civilite_destinataire_Cerfa',
                                type: 'select',
                                value: null,
                                url: '../api/select/genre',
                            },
                            {
                                id: 'nom_destinataire_Cerfa',
                                type: 'input',
                                value: null,
                            },
                            {
                                id: 'prenom_destinataire_Cerfa',
                                type: 'input',
                                value: null,
                            },
                            {
                                id: 'telephone_destinataire_Cerfa',
                                type: 'input',
                                value: null,
                            },
                            {
                                id: 'mail_destinataire_Cerfa',
                                type: 'input',
                                value: null,
                            },
                        ]}
                    />
                )}
            </>
        </div>
    )
}

export default withAuthorization(CerfaPage, ['AD', 'PR'])
