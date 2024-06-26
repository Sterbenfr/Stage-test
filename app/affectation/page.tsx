'use client'
import { useEffect, useState } from 'react'
import List from '../../components/list'
import { Pagination } from '@/components/pagination'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'

export interface Affectation {
    code_Utilisateur_Prospecteur: string
    code_Entite: string
    commentaires : string
    date_affectation : Date
    date_arret_affectation : Date
}

function AffectationsPage() {
    const [Affectation, setAffectation] = useState<Affectation[]>([])
    const [page, setPage] = useState(1) // new state for the current page
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(3)

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchAffectation = async () => {
            const res = await fetch(`http://localhost:3000/api/affectation?page=${page}&limit=${itemsPerPage}`)

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const { data, total }: { data: Affectation[]; total: number } =
                await res.json()
            setAffectation(data)
            setTotalItems(total) // set the total items
        }

        fetchAffectation()
    }, [page, itemsPerPage])

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
                items={Affectation.map(affectation => ({
                    value1: affectation.code_Utilisateur_Prospecteur,
                    value2: affectation.code_Utilisateur_Prospecteur,
                    value3: affectation.code_Entite,
                    value4: affectation.commentaires,
                    value5:
                    affectation.date_affectation == null
                            ? ''
                            : affectation.date_affectation
                                  .toString()
                                  .split('T')[0],
                    value6:
                    affectation.date_arret_affectation == null
                            ? ''
                            : affectation.date_arret_affectation
                                    .toString()
                                    .split('T')[0],
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
                    url='http://localhost:3000/api/affectation'
                    fields={[
                        {
                            id: 'code_Utilisateur_Prospecteur',
                            type: 'input',
                            value: null,
                        },
                        {
                            id: 'code_Entite',
                            type: 'input',
                            value: null,
                        },
                        {
                            id: 'commentaires',
                            type: 'input',
                            value: null,
                        },
                        {
                            id: 'date_affectation',
                            type: 'date',
                            value: null,
                        },
                        {
                            id: 'date_arret_affectation',
                            type: 'date',
                            value: null,
                        }
                    ]}
                />
            )}
        </>
    )
}
export default withAuthorization(AffectationsPage, ['AD', 'PR'])