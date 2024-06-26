'use client'
import List from '../../../components/list'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'

export interface Mode_Conservation_Produits {
    id: string
    label: string
}

function Mode_Conservations_ProduitsPage() {
    const [Mode_Conservations_Produits, setMode_Conservations_Produits] =
        useState<Mode_Conservation_Produits[]>([])
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchMode_Conservations_Produits = async () => {
            const res = await fetch(
                'http://localhost:3000/api/dons/type-mode-conservations-produits',
            )

            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }

            const Mode_Conservations_Produits: Mode_Conservation_Produits[] =
                await res.json()
            setMode_Conservations_Produits(Mode_Conservations_Produits)
        }

        fetchMode_Conservations_Produits()
    }, [])

    return (
        <>
            <List
                items={Mode_Conservations_Produits.map(
                    modeConservationProduit => ({
                        value1: modeConservationProduit.id.toString(),
                        value2: modeConservationProduit.id.toString(),
                        value3: modeConservationProduit.label,
                    }),
                )}
                functions={{
                    fonc1: () => {
                        isPopUpOpen
                            ? setIsPopUpOpen(false)
                            : setIsPopUpOpen(true)
                    },
                }}
            />
            {isPopUpOpen && (
                <PopUp
                    onClose={handleClose}
                    url='http://localhost:3000/api/dons/type-mode-conservation-produits'
                    fields={[
                        { id: 'id', type: 'input', value: null },
                        { id: 'label', type: 'input', value: null },
                    ]}
                />
            )}
        </>
    )
}

export default withAuthorization(Mode_Conservations_ProduitsPage, ['AD', 'PR'])
