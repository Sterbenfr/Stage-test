'use client'
import { useEffect, useState } from 'react'

interface Interactions {
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

export default function InteractionsPage() {
    const [Interactions, setInteractions] = useState<Interactions[]>([])

    useEffect(() => {
        const fetchInteractions = async () => {
            const res = await fetch('http://localhost:3000/api/interactions')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const Interactions: Interactions[] = await res.json()
            setInteractions(Interactions)
        }

        fetchInteractions()
    }, [])

    return (
        <div>
            <h1>Interactions</h1>
            {Interactions.map(TypeInteractions => (
                <div key={TypeInteractions.code_Utilisateur_Prospecteur}>
                    <h2>{TypeInteractions.code_Utilisateur_Prospecteur}</h2>
                    <p>{TypeInteractions.code_Entite_Prospectee}</p>
                    <p>{TypeInteractions.date_interaction.toString()}</p>
                    <p>{TypeInteractions.code_type_interaction}</p>
                    <p>{TypeInteractions.code_modalite_interaction}</p>
                    <p>{TypeInteractions.code_contact_entite}</p>
                    <p>{TypeInteractions.commentaires}</p>
                    <img src='TypeInteractions.pieces_associees' alt='' />
                    <p>{TypeInteractions.date_relance.toString()}</p>
                </div>
            ))}
        </div>
    )
}
