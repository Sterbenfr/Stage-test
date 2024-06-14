'use client'
import { useEffect, useState } from 'react'
import List from '../../../components/list'

interface Groupe {
    code_Groupe: number
    nom_du_Groupe: string
    Logo: Blob
    site_Web: string
    commentaires: string
    date_arret_activite_du_Groupe: Date
}

export default function GroupesPage() {
    const [groupes, setGroupes] = useState<Groupe[]>([])

    useEffect(() => {
        const fetchGroupes = async () => {
            const res = await fetch('http://localhost:3000/api/societe/groupe')

            if (!res.ok) {
                console.log('Status:', res.status)
                console.log('Status Text:', res.statusText)
                throw new Error('Failed to fetch data')
            }

            const groupes: Groupe[] = await res.json()
            setGroupes(groupes)
        }

        fetchGroupes()
    }, [])

    return (
        <div>
            <h1>Groupes</h1>
            <List items={groupes.map(groupe => ({
                value1: groupe.code_Groupe.toString(),
                value2: groupe.nom_du_Groupe,
                value3: groupe.site_Web,
                value4: groupe.date_arret_activite_du_Groupe==null ? "" : groupe.date_arret_activite_du_Groupe.toString().split("T")[0]
            }))} />
        </div>
    )
}
