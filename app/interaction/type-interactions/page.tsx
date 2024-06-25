'use client'
import { useEffect, useState } from 'react'
import PopUp from '@/components/popUp'
import withAuthorization from '@/components/withAuthorization'

export interface Interaction {
    code_type_interaction: string
    libelle: string
}

function InteractionsPage() {
    const [Interactions, setInteractions] = useState<Interaction[]>([])

    const [isPopUpOpen, setIsPopUpOpen] = useState(false)

    const handleClose = () => {
        setIsPopUpOpen(false)
    }

    useEffect(() => {
        const fetchInteractions = async () => {
            const res = await fetch(
                'http://localhost:3000/api/interactions/type-interactions',
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Interactions: Interaction[] = await res.json()
            setInteractions(Interactions)
        }

        fetchInteractions()
    }, [])

    return (
        <>
            <div>
                <h1>Type Interactions</h1>
                {Interactions.map(TypeInteractions => (
                    <div key={TypeInteractions.code_type_interaction}>
                        <h2>{TypeInteractions.libelle}</h2>
                        <h2>{TypeInteractions.code_type_interaction}</h2>
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
export default withAuthorization(InteractionsPage, ['AD', 'PR'])
