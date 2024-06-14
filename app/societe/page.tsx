'use client'
import { useEffect, useState } from 'react'
import List from  '../../components/list'

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
            <h1>Sociétés</h1>
            <List items={societes.map(societe => ({
                value1: societe.code_Societe.toString(),
                value2: societe.raison_sociale,
                value3: societe.site_Web,
                value4: societe.commentaires,
                value5: societe.date_arret_activite_Societe==null ? "" : societe.date_arret_activite_Societe.toString().split("T")[0]
            }))} />
        </div>
    )
}
