'use client'
import { useEffect, useState } from 'react'

interface Modalite_Interactions {
    code_modalite_interaction: string
    libelle: string
}

export default function Modalites_InteractionsPage() {
    const [Modalites_Interactions, setModalites_Interactions] = useState<Modalite_Interactions[]>([])

    useEffect(() => {
        const fetchModalites_Interactions = async () => {
            const res = await fetch(
                'http://localhost:3000/api/type-modalite-interactions',
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Modalites_Interactions: Modalite_Interactions[] = await res.json()
            setModalites_Interactions(Modalites_Interactions)
        }

        fetchModalites_Interactions()
    }, [])
    return (
        <div>
            <h1>Modalite Interactions</h1>
            {Modalites_Interactions.map(ModaliteInteractions => (
                <div key={ModaliteInteractions.code_modalite_interaction}>
                    <h2>{ModaliteInteractions.libelle}</h2>
                    <h2>{ModaliteInteractions.code_modalite_interaction}</h2>
                </div>
            ))}
        </div>
    )
}
