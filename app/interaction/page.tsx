'use client'
import { useEffect, useState } from 'react'
import List from '@/components/list'

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
        <List
            items={Interactions.map(Interactions => ({
                value1: Interactions.code_Entite_Prospectee.toString(),
                value2: Interactions.date_interaction.toString().split('T')[0],
                value3: Interactions.code_contact_entite.toString(),
                value4: Interactions.date_relance.toString().split('T')[0],
            }))}
        />
    )
}
