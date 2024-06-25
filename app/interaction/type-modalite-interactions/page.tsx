'use client'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'

export interface Modalite_Interactions {
    code_modalite_interaction: string
    libelle: string
}

function Modalites_InteractionsPage() {
    const [Modalites_Interactions, setModalites_Interactions] = useState<
        Modalite_Interactions[]
    >([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchModalites_Interactions = async () => {
            const res = await fetch(
                'http://localhost:3000/api/interactions/type-modalite-interactions',
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Modalites_Interactions: Modalite_Interactions[] =
                await res.json()
            setModalites_Interactions(Modalites_Interactions)
        }

        fetchModalites_Interactions()
    }, [])
    return (
        <>
            <div>
                <h1>Modalite Interactions</h1>
                {Modalites_Interactions.map(ModaliteInteractions => (
                    <div key={ModaliteInteractions.code_modalite_interaction}>
                        <h2>{ModaliteInteractions.libelle}</h2>
                        <h2>
                            {ModaliteInteractions.code_modalite_interaction}
                        </h2>
                    </div>
                ))}
            </div>
            <button onClick={() => setIsPopUpOpen(true)}>Open PopUp</button>
            {isPopUpOpen && (
                <PopUp
                    onClose={handleClose}
                    url='http://localhost:3000/api/interactions/type-modalite-interactions'
                    fields={[
                        {
                            id: 'code_modalite_interaction',
                            type: 'input',
                            value: null,
                        },
                        {
                            id: 'libelle',
                            type: 'input',
                            value: null,
                        },
                    ]}
                />
            )}
        </>
    )
}
export default withAuthorization(Modalites_InteractionsPage, ['AD', 'PR'])
