'use client'
import { useEffect, useState } from 'react'

interface Interaction {
    code_type_interaction: string
    libelle: string
}

export default function InteractionsPage() {
    const [Interactions, setInteractions] = useState<Interaction[]>([])

    useEffect(() => {
        const fetchInteractions = async () => {
            const res = await fetch(
                'http://localhost:3000/api/type-interactions',
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
        <div>
            <h1>Type Interactions</h1>
            {Interactions.map(TypeInteractions => (
                <div key={TypeInteractions.code_type_interaction}>
                    <h2>{TypeInteractions.libelle}</h2>
                    <h2>{TypeInteractions.code_type_interaction}</h2>
                </div>
            ))}
        </div>
    )
}
