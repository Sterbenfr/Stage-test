'use client'
import { useEffect, useState } from 'react'

interface Societe {
    code_Societe: number
    raison_sociale: string
    nom_commercial: string
    Logo: Blob
    site_Web: string
    Siren: string
    code_type_activite_Societe: string
    commentaires: string
    code_Groupe_appartenance: number
    date_arret_activite_Societe: Date
}

export default function SocietesPage() {
    const [societes, setSocietes] = useState<Societe[]>([])

    useEffect(() => {
        const fetchSocietes = async () => {
            const res = await fetch('http://localhost:3000/api/societe')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const societes: Societe[] = await res.json()
            setSocietes(societes)
        }

        fetchSocietes()
    }, [])

    return (
        <div>
            <h1>Societes</h1>
            {societes.map(Societe => (
                <div key={Societe.code_Societe}>
                    <h2>
                        {Societe.code_Societe} : {Societe.nom_commercial}
                    </h2>
                    <p>raison_sociale: {Societe.raison_sociale}</p>
                    <p>site_Web: {Societe.site_Web}</p>
                    <p>Siren: {Societe.Siren}</p>
                    <p>code_type_activite_Societe: {Societe.code_type_activite_Societe}</p>
                    <p>commentaires: {Societe.commentaires}</p>
                    <p>code_Groupe_appartenance: {Societe.code_Groupe_appartenance}</p>
                    <p>date_arret_activite_Societe: {Societe.date_arret_activite_Societe==null ? "" : Societe.date_arret_activite_Societe.toString()}</p>
                </div>
            ))}
        </div>
    )
}
