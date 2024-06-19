'use client'
import { useEffect, useState } from 'react'

interface interactionID {
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

export default function InteractionPage({
    params,
}: {
    params: { interactionID: string }
}) {
    const [interaction, setInteraction] = useState<interactionID[]>([])

    useEffect(() => {
        const fetchInteraction = async () => {
            if (!params.interactionID) return

            const res = await fetch(
                `http://localhost:3000/api/interactions/${params.interactionID}`,
            )

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const interaction: interactionID[] = await res.json()
            setInteraction(interaction)
        }

        fetchInteraction()
    }, [params.interactionID])
    if (!interaction || interaction.length === 0) return <div>Loading...</div>

    return (
        <div>
            <h1>Interaction</h1>
            <p>{interaction[0].code_Utilisateur_Prospecteur}</p>
            <p>{interaction[0].code_Entite_Prospectee}</p>
            <p>
                {interaction[0].date_interaction == null
                    ? ''
                    : interaction[0].date_interaction.toString().split('T')[0]}
            </p>
            <p>{interaction[0].code_type_interaction}</p>
            <p>{interaction[0].code_modalite_interaction}</p>
            <p>{interaction[0].code_contact_entite}</p>
            <p>{interaction[0].commentaires}</p>
            <p>
                {interaction[0].date_relance == null
                    ? ''
                    : interaction[0].date_relance.toString().split('T')[0]}
            </p>
        </div>
    )
}
